const express = require('express');
const app = express();
const dbConnect = require('./config/dbconnect');

dbConnect("mongodb://127.0.0.1:27017/urlShortner-app-1");



app.listen(8000, () => {console.log("server is running")});