const { checkSite } = require("../checker"); 
const Result = require("../models/Results"); 

exports.runSingleCheck = async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ msg: "URL is required" });
  }

  try {

    const resultData = await checkSite(url, "./screenshots");


    const newResult = new Result(resultData);


    await newResult.save();


    res.status(200).json(resultData);

  } catch (error) {
    console.error("Error during site check:", error);
    res.status(500).json({ msg: "Server error during check" });
  }
};

exports.runAllChecks = async (req, res) => {
  const { urls } = req.body;
  if (!urls || !Array.isArray(urls)) {
    return res.status(400).json({ msg: "An array of URLs is required" });
  }

  try {
    
    const checkPromises = urls.map(url => checkSite(url, "./screenshots"));
    const resultsData = await Promise.all(checkPromises);

  
    res.status(200).json(resultsData);
  } catch (error) {
    console.error("Error during bulk check:", error);
    res.status(500).json({ msg: "Server error during bulk check" });
  }
};