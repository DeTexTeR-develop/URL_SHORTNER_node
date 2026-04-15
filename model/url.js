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

    visitHistory: [
        {
            timestamps: {
                type: Date,
                default: Date.now
            }
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",   
        required: true 
    },
}, 
{
    timestamps: true
});

const URL = mongoose.model('url', urlSchema);
module.exports = URL;