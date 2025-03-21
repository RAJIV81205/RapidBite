import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ message: "Login successful", token, user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/verify-token", verifyToken, async (req, res) => {
    try {
        const { password, ...userWithoutPassword } = req.user.toObject();
        res.status(200).json({ message: "Token is valid", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.put("/update-profile", verifyToken, async (req, res) => {
    try {
        const { name, email, mobile, gender, state, city, address, pincode } = req.body;
        
        if (email !== req.user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already taken" });
            }
        }

        if (mobile && mobile !== req.user.mobile) {
            const existingUser = await User.findOne({ mobile });
            if (existingUser) {
                return res.status(400).json({ message: "Mobile number is already taken" });
            }
        }

        req.user.name = name;
        req.user.email = email;
        req.user.mobile = mobile;
        req.user.gender = gender;
        req.user.state = state;
        req.user.city = city;
        req.user.address = address;
        req.user.pincode = pincode;
        req.user.updatedAt = new Date();

        await req.user.save();

        const { password, ...userWithoutPassword } = req.user.toObject();
        res.status(200).json({ message: "Profile updated successfully", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/google-login", async (req, res) => {
    try {
        const { email, name, googleId } = req.body;
        
        if (!email || !name || !googleId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            existingUserByEmail.googleId = googleId;
            await existingUserByEmail.save();
            const token = jwt.sign({ userId: existingUserByEmail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        const newUser = new User({ email, name, googleId });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('Google login error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email or Google ID already exists" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/github-login", async (req, res) => {
    try {
        const { email, name, githubId } = req.body;
        
        if (!email || !name || !githubId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const existingUser = await User.findOne({ githubId });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            existingUserByEmail.githubId = githubId;
            await existingUserByEmail.save();
            const token = jwt.sign({ userId: existingUserByEmail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        const newUser = new User({ email, name, githubId });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error('GitHub login error:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email or GitHub ID already exists" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router; 