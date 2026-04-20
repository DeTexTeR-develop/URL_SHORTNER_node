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
};


function restrictToRoles(roles = []) {
    return function(req, res, next){
        if(!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        next();
    }
}

module.exports = {authMiddleware, restrictToRoles};