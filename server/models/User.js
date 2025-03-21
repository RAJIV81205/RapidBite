import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    googleId: { type: String, sparse: true, default: null },
    githubId: { type: String, sparse: true, default: null },
    mobile: { type: String, sparse: true, default: null },
    gender: { type: String, default: null },
    state: { type: String, default: null },
    city: { type: String, default: null },
    address: { type: String, default: null },
    pincode: { type: String, default: null },
    userType: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

export default User; 