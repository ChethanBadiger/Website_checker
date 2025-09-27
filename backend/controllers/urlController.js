const Url = require('../models/url');

exports.getUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};


exports.saveUrls = async (req, res) => {
  try {
    const { urls } = req.body; 
    if (!urls || !Array.isArray(urls)) {
        return res.status(400).json({ msg: 'Input must be an array of URLs.' });
    }

    const urlObjects = urls.map(url => ({ url }));
 
    await Url.insertMany(urlObjects, { ordered: false }); 

    res.status(201).json({ msg: 'URLs processed successfully.' });
  } catch (err) {
 
    if (err.code === 11000) {
        return res.status(201).json({ msg: 'URLs processed, duplicates were ignored.' });
    }
    res.status(500).json({ msg: 'Server Error' });
  }
};

exports.deleteUrl = async (req, res) => {
  try {
    await Url.findByIdAndDelete(req.params.id);
    res.json({ msg: 'URL deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};