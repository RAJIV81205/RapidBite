import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    googleId: { type: String, sparse: true,default: null },
    githubId: { type: String, sparse: true, default: null },
    mobile: {type: String, sparse: true, default: null},
    gender: {type: String, default: null},
    state: {type: String, default: null},
    city: {type: String, default: null},
    address: {type: String, default: null},
    pincode: {type: String, default: null},
    userType: {type: String, default: 'user'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "No authorization header found" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "No token found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token has expired" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
};

// Middleware to verify admin status
const verifyAdmin = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        if (req.user.userType !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin privileges required" });
        }

        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
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
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.post("/verify-token", verifyToken, async (req, res) => {
    try {
        const { password, ...userWithoutPassword } = req.user.toObject();
        res.status(200).json({ message: "Token is valid", user: userWithoutPassword });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Update user profile
app.put("/update-profile", verifyToken, async (req, res) => {
    try {
        const { name, email, mobile, gender, state, city, address, pincode } = req.body;
        
        // Check if email is being changed and if it's already taken
        if (email !== req.user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: "Email is already taken" });
            }
        }

        // Check if mobile is being changed and if it's already taken
        if (mobile && mobile !== req.user.mobile) {
            const existingUser = await User.findOne({ mobile });
            if (existingUser) {
                return res.status(400).json({ message: "Mobile number is already taken" });
            }
        }

        // Update user fields
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

app.post("/google-login", async (req, res) => {
    try {
        const { email, name, googleId } = req.body;
        
        // Validate required fields
        if (!email || !name || !googleId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists with googleId
        const existingUser = await User.findOne({ googleId });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        // Check if user already exists with email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            // Update existing user with googleId
            existingUserByEmail.googleId = googleId;
            await existingUserByEmail.save();
            const token = jwt.sign({ userId: existingUserByEmail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        // Create new user
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

app.post("/github-login", async (req, res) => {
    try {
        const { email, name, githubId } = req.body;
        
        // Validate required fields
        if (!email || !name || !githubId) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if user already exists with githubId   
        const existingUser = await User.findOne({ githubId });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }       

        // Check if user already exists with email
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            // Update existing user with githubId
            existingUserByEmail.githubId = githubId;
            await existingUserByEmail.save();
            const token = jwt.sign({ userId: existingUserByEmail._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        }

        // Create new user
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

const orderSchema = new mongoose.Schema({
    orderId: { type: String, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        name: String,
        quantity: Number,
        price: String,
        _id: false
    }],
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    mobile: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

app.post('/create-order', verifyToken, async (req, res) => {
    try {
        const { items, totalAmount, address, city, state, pincode, mobile } = req.body;
        
        const orderId = generateOrderId();  

        const newOrder = new Order({
            orderId,
            userId: req.user._id,
            items,
            totalAmount,
            address,
            city,
            state,
            pincode,
            mobile,
        });

        await newOrder.save();

        res.status(201).json({ message: "Order created successfully", orderId , newOrder });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}); 

app.get('/orders', verifyToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id });
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/orders/:orderId', verifyToken, async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId });
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if (order.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        res.status(200).json({ order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/admin/orders', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({ orders });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}); 

app.patch('/admin/orders/:orderId', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.orderId, { status }, { new: true });
        res.status(200).json({ message: "Order status updated successfully", order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.get('/admin/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

const generateOrderId = () => {
    return Math.floor(Math.random() * 10000000);
};  

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});










