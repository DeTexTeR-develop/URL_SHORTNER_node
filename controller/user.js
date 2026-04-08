const User = require('../model/user');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    console.log(req.body);
    const user = await User.create(req.body);
    res.json({message: "user created", user});
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
    };
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
    };

    res.json({ message: "Login successful" });
};
module.exports = {createUser, loginUser};