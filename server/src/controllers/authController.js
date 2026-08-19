const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const registerUser = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            role,
            phone,
            agencyName,
            profileImage
        } = req.body;


        
        const normalizedEmail = email.toLowerCase().trim();


        
        if (
            role !== "Admin" &&
            role !== "Traveller" &&
            role !== "Operator"
        ) {

            return res.status(400).json({
                success: false,
                message: "Invalid Role",
            });

        }


        
        const existingUser = await UserModel.findOne({
            email: normalizedEmail
        });


        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });

        }


        
        const hashedPassword = await bcrypt.hash(password, 10);


        
        const user = await UserModel.create({

            name,

            email: normalizedEmail,

            password: hashedPassword,

            phone,

            role,

            agencyName,

            profileImage,

            
            
            status: role === "Traveller"
                ? "Approved"
                : "Pending",

        });


        const userData = user.toObject();

        delete userData.password;


        res.status(201).json({

            success: true,

            message: "User Registered Successfully",

            user: userData,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        
        const normalizedEmail = email.trim();

        
        const user = await UserModel.findOne({
            email: {
                $regex: `^${normalizedEmail}$`,
                $options: "i"
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password",
            });
        }

        
        if (user.status !== "Approved") {
            return res.status(400).json({
                success: false,
                message: `Your account is ${user.status}`,
            });
        }

        
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        const userData = user.toObject();

        delete userData.password;

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: userData,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};



const getProfile = async (req, res) => {

    try {

        res.status(200).json({

            success: true,

            user: req.user,

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



const adminDashboard = (req, res) => {

    res.status(200).json({

        success: true,

        message: "Welcome Admin",

    });

};



const createAdmin = async (req, res) => {

    try {

        const hashedPassword = await bcrypt.hash(
            "admin123",
            10
        );


        const admin = await UserModel.create({

            name: "Shrikrishna",

            email: "shrikrishna@gmail.com",

            password: hashedPassword,

            phone: "9876543210",

            role: "Admin",

            agencyName: "",

            isApproved: true,

        });


        res.json({

            success: true,

            message: "Admin Created",

            admin,

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};


module.exports = {

    registerUser,

    loginUser,

    getProfile,

    adminDashboard,

    createAdmin

};