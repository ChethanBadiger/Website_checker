// backend/checker.js
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const replace_space = (name) => name.replace(/[:\/\\?%*:|"<>]/g, "_");

async function checkSite(url, outputDir) {
  const res = {
    url,
    errors: [],
    anomaly: false,
    finalUrl: null,
    screenshotPath: null,
    log: null,
  };

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'true',
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    const response = await page.goto(url, {
      timeout: 40000,
      waitUntil: "networkidle2",
    });

    res.finalUrl = page.url();

    let redirectCount = response.request().redirectChain().length;
    if (redirectCount > 3) {
      res.errors.push("too many redirects");
    }

    const content = await page.content();

    if (
      /(SQL syntax|mysqli|PDOException|ORA-|error establishing a database connection|database error)/i.test(
        content
      )
    ) {
      res.errors.push("database error have been detected");
    }

    if (
      /(casino|betting|poker|gambling|free spins|porn|xxx|sex)/i.test(
        content
      )
    ) {
      res.anomaly = true;
      res.errors.push("adult/gambling content");
    }

    if (
      /(captcha|verify you are human|are you a robot|bot checker|cloudflare|hcaptcha|recaptcha)/i.test(
        content
      )
    ) {
      res.anomaly = true;
      res.errors.push("captcha");
    }

    const fname = `${replace_space(url)}.png`;
    const fullPath = path.join(outputDir, fname);
    await fs.promises.mkdir(outputDir, { recursive: true });
    await page.screenshot({ path: fullPath, fullPage: true });
    res.screenshotPath = fullPath;
  } catch (error) {
    const msg = error.message || "";
    if (/SSL|CERT|certificate/i.test(msg)) {
      res.errors.push("ssl error");
    } else if (/Timeout|Navigation|ENOTFOUND|ERR_NAME_NOT_RESOLVED/i.test(msg)) {
      res.errors.push("site unreachable");
    } else {
      res.errors.push("other: " + msg.slice(0, 200));
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toISOString().split("T")[1].split(".")[0];
    res.log = `Check finished at: ${date} ${time}`;
  }

  return res;
}


module.exports = { checkSite };