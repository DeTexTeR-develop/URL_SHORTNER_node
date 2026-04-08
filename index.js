const express = require('express');
const app = express();
const dbConnect = require('./config/dbconnect');
const urlRoute = require('./route/url');
const userRoute = require('./route/user');

dbConnect("mongodb://127.0.0.1:27017/urlShortner-app-1");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/url', urlRoute);
app.use('/api/user', userRoute); 

app.listen(8000, () => {console.log("server is running")});