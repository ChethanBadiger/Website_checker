const express = require("express");
const { saveUrls, getUrls } = require("../controllers/urlController");

const router = express.Router();

router.post("/save", saveUrls);
router.get("/all", getUrls);

module.exports = router;