const jwt = require('jsonwebtoken');
const authMiddleware = async(req, res, next) => {
    const header = req.headers.authorization;
    if(!header) return res.send({message: "no header found"});

    const token = await header.split(" ")[1];

    try{
        const decoded = jwt.verify(token, "secret_key");
        console.log(decoded);
        req.user = decoded;
        console.log("this is the decode...", decoded);
        next();
    }catch(err) {
        throw new Error(err);
    }
}

module.exports = {authMiddleware};