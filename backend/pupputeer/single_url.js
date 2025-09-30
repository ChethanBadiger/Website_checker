import puppeteer from "puppeteer";
import Database from "better-sqlite3";

const db = new Database("../data.db"); 

// Fetch all URLs from the records table
function getAllUrls() {
  try {
    return db.prepare("SELECT url FROM records").all().map(r => r.url);
  } catch (err) {
    console.error("Error reading database:", err.message);
    return [];
  }
}

// only checks a single site at a time (40s) 
async function checkSite(url) {
    const res = {
        url,
        errors: [],
        anomaly: false,
        finalUrl: null,
        log: null
    };

    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox"]
    });

    const page = await browser.newPage();

    try {
        const response = await page.goto(url, {
            timeout: 100000,
            waitUntil: "networkidle2"
        });

        res.finalUrl = page.url();

        // Count redirects
        let redirectCount = 0;
        if (response && response.request()) {
            let req = response.request();
            while (req.redirectChain().length > redirectCount) {
                redirectCount = req.redirectChain().length;
            }
        }
        if (redirectCount > 3) res.errors.push("too many redirects");

        const content = await page.content();

        // 1. Site doesn't open
        if (/site can't be reached|this site can’t be reached|failed to fetch|timeout|could not connect/i.test(content)) {
            res.errors.push("Site doesn't open");
        }

        // 2. SSL error
        if (/SSL|ERR_SSL|certificate|ERR_CERT_COMMON_NAME_INVALID|ERR_CERT_AUTHORITY_INVALID/i.test(content)) {
            res.errors.push("SSL error detected");
        }

        // 3. Site gets redirected
        if (/too many redirects|redirected you too many times/i.test(content)) {
            res.errors.push("Site is being redirected (possible malware/attack)");
        }

        // 4. Database error
        if (/(SQL syntax|mysqli|PDOException|ORA-|error establishing a database connection|database error)/i.test(content)) {
            res.errors.push("Database error detected");
        }
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
