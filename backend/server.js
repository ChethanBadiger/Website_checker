const express = require('express');
require('dotenv').config();

const app = express();

const port = process.env.port || 5000;

app.use(express.json());
app.use("/api/urls", require('./Routes/UrlRoutes'));

app.listen(port, () => {
    `Server is running port ${port}`;
})