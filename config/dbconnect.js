const mongoose = require('mongoose');

const dbConnect = (url) => mongoose.connect(url)
.then(() => {
    console.log("db connected")
})
.catch((err) => {throw new Error("error occured while db connection", err)});

module.exports = dbConnect;
    