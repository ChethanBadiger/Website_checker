const express = require("express");
const { runSingleCheck, runAllChecks } = require("../controllers/checkController"); // Add runAllChecks

const router = express.Router();

router.post("/run", runSingleCheck);
router.post("/run-all", runAllChecks); 

module.exports = router;