const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    try {
        // Check if email already exists
        const emailExist = await UserModel.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(200).send("Email already exists");
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create new user
        const newUser = new UserModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });

        // Save user to database
        const user = await newUser.save();
        res.status(201).redirect("/profile");
    } catch (error) {
        res.status(500).send(error);
    }
};
