const express = require("express");
const { saveUrls, getUrls, deleteUrl } = require("../controllers/urlController");
const router = express.Router();

router.get("/all", getUrls);
router.post("/save", saveUrls); 
router.delete("/delete", deleteUrl);

module.exports = router;