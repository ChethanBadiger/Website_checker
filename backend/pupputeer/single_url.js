import puppeteer from "puppeteer";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const db = new Database("../data.db"); 

function safeFilename(url) {
  return url.replace(/[:\/\\?%*|"<>]/g, "_");
}

// only checks a single site at a time (1min) 
async function checkSite(url) {
    const res = {
        url,
        errors: [],
        anomaly: false,
        finalUrl: null,
        screenshotPath: null,
        log: null
    };

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    try {
        const response = await page.goto(url, {
            timeout: 30000,
            waitUntil: "domcontentloaded"
        });

        res.finalUrl = page.url();

        // Count redirects
        const redirectCount = response.request().redirectChain().length;
        if (redirectCount > 3) res.errors.push("too many redirects");


        const content = await page.content();

        if (/too many redirects|redirected you too many times/i.test(content)) {
            res.errors.push("Site is being redirected (possible malware/attack)");
        }

        if (/(SQL syntax|mysqli|PDOException|ORA-|error establishing a database connection|database error)/i.test(content)) {
            res.errors.push("Database error detected");
        }

            const outputDir = path.resolve("./screenshots");
            await fs.promises.mkdir(outputDir, { recursive: true });

            const fname = safeFilename(url) + ".png";
            const fullPath = path.join(outputDir, fname);

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
        await browser.close();
        const now = new Date();
        const date = now.toISOString().split("T")[0];
        const time = now.toISOString().split("T")[1].split("Z")[0];
        res.log = `Check finished at: ${date} ${time}`;
    }

    return res;
}

// Main function: fetch all URLs from DB and check them
async function checkAllSites() {
    const rows = db.prepare("SELECT url FROM records").all();

    const results = [];
    for (const row of rows) {
        try {
            const siteResult = await checkSite(row.url);
            results.push(siteResult);
            console.log(siteResult); // log each result
        } catch (err) {
            console.error("Error checking site:", row.url, err.message);
        }
    }

    return results;
}

// Run
(async () => {
    const allResults = await checkAllSites();
    console.log("All checks completed:", allResults.length);
})();
