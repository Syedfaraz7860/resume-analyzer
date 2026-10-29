import userModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check user already exists or not
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create user
        await userModel.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// ================= LOGIN =================
// ================= LOGIN =================
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user exists
        const userExists = await userModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            userExists.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: userExists._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        // Login success
        res.status(200).json({
            message: "User logged in successfully",

            token,

            user: {
                id: userExists._id,
                name: userExists.name,
                email: userExists.email
            }
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

