const URL = require('../model/url.js');

const createUniqueShortId = async(req, res) => {
    const url = req.body.redirectURL;
    const {nanoid} =  await import('nanoid');
    console.log(nanoid);

    if (!url) {
    return res.status(400).json({ message: "URL is required" });
        };
    const shortId = nanoid(8);
    const shortUrl = await URL.create({
        shortID : shortId,
        redirectURL: url,
    });

    res.json({id: shortId});
};

const getURl = async(req, res) => {
    const shortID = req.params.id;
    console.log(shortID);
    const foundUrl = await URL.findOneAndUpdate(
    { shortID: shortID },
    {
        $push: {
            visitHistory: { timestamp: new Date() }
        }
    },
    { new: true }
    );
    res.json({message: foundUrl.redirectURL});
}


module.exports = {createUniqueShortId, getURl};