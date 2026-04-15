const URL = require('../model/url.js');

const createUniqueShortId = async(req, res) => {
    const url = req.body.redirectURL;
    const {nanoid} =  await import('nanoid');

    if (!url) {
    return res.status(400).json({ message: "URL is required" });
        };
    const shortId = nanoid(8);
    const shortUrl = await URL.create({
        shortID : shortId,
        redirectURL: url,
        createdBy: req.user.id,
        visitHistory: [],
    });

    res.json({id: shortId, url: shortUrl});
};
const getURl = async (req, res) => {
    const shortID = req.params.id;

    const foundUrl = await URL.findOneAndUpdate(
        { shortID: shortID },
        {
            $push: {
                visitHistory: { timestamp: new Date() }
            }
        },
        { new: true }
    );

    if (!foundUrl) {
        return res.status(404).send("Short URL not found");
    }
    res.redirect(foundUrl.redirectURL);
};
const getAnalytics = async (req, res) => {
    const shortID = req.params.id;

    const url = await URL.findOne({shortID});
    console.log(url);
    
    res.json({
        totalClicks: url.visitHistory.length,
        analytics: url.visitHistory
    });
};


module.exports = {createUniqueShortId, getURl, getAnalytics};