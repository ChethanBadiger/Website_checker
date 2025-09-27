const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5001;


app.use(cors());

app.use(express.json());


const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log(' MongoDB database connection established ');
});


app.use("/api/urls", require("./Routes/UrlRoutes"));

app.use("/api/check", require("./Routes/CheckRoutes"));


app.listen(port, () => {
  console.log(` Server is running on port: http://localhost:${port}`);
});