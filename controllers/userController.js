const User = require("../models/user");

//get all user data
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        users.googleId = undefined;

        res.status(200).json(users);
    } catch (err) {
        res.json({ message: err });
    }
}

//get user by id
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    } catch (err) {
        res.json({ message: err });
    }
}


