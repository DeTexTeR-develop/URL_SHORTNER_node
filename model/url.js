const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID: {
        type: String,
        required: true,
        unique: true,
    },

    redirectURL: {
        type: String,
        required: true,
    },

    visitHistory: [{timestamps: true}],

}, {timestamps: true});

URL = mongoose.model('url', urlSchema);
module.exports = URL;