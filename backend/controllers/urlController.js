//@desc get all urls
//@route GET /api/urls
//@access public

const getUrls = (req,res) => {
    res.status(200).json({"message":"Hello from backend"});
};
//@desc create a url 
//@route POST /api/urls
//@access public

const createUrls = (req,res) => {
    console.log("The requested body is: ",req.body);
    const {name} = req.body;
    if(!name){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    res.status(201).json({"message":"Hello from backend"});
};
//@desc delete a url by id 
//@route DELETE /api/urls/:id
//@access public

const deleteUrl = (req,res) => {
    res.status(200).json({"message":`remove url ${req.params.id}`});
}
//@desc upload csv
//@route POST /api/urls/bulk
//@access public

const uploadCSV = (req,res) => {
    res.status(201).json({"message":"Hello from backend"});
}
//@desc export the list 
//@route GET /api/urls/export
//@access public

const exportURL = (req,res) => {
    res.status(200).json({"message":"Hello from backend"});
}
//@desc a manual trigger to run the check 
//@route POST /api/urls/run
//@access public

const runCheck = (req,res) => {
    res.status(201).json({"message":"Hello from backend"});
}
//@desc get log + screenshot URLs for that date.
//@route GET /api/urls/logs/:date
//@access public

const logDate = (req,res) => {
    res.status(200).json({"message":"Hello from backend"});
}

module.exports = {
    getUrls,
    createUrls,
    deleteUrl,
    uploadCSV,
    exportURL,
    runCheck,
    logDate
}