const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    const token  =  jwt.sign({
        id: user.id,
        email: user.email,
    },"secret_key", {expiresIn: "1h"});



    res.json({ message: "Login successful" , token});
};

const getAllUsers = async(req, res) => {
    const allUsers = await User.find({});
    res.json({message: `${allUsers.length} users found`, Users: allUsers});
};

const getUser = async( req, res) => {
    const user = await User.findById(req.user.id);
    res.json(user);
}
const updateUser = async(req, res) =>{
    const id = req.params.id;
    if(!id){
        throw new Error(err, "id is required");
    };
    const {email} = req.body;
    console.log(email);
    if(!email){
        throw new Error(err, "content required to update");
    }
    const updatedUser = await User.findByIdAndUpdate(id, {email});
    console.log(updatedUser);
    res.json({message: "User updated", user: updatedUser});
};
module.exports = {createUser, loginUser, getAllUsers, updateUser, getUser};