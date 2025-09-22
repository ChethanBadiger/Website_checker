const express = require('express');
const router = express.Router();
const {getUrls, createUrls, deleteUrl, uploadCSV, exportURL, runCheck, logDate} = require('../controllers/urlController');

router.route('/').get(getUrls);

//add urls
router.route('/').post(createUrls);

//remove urls
router.route('/:id').delete(deleteUrl);

//upload csv
router.route('/bulk').post(uploadCSV);

//export list 
router.route('/export').get(exportURL);

//manually run trigger
router.route('/run').post(runCheck);

// get log date 
router.route('/logs/:date').get(logDate);


module.exports = router;