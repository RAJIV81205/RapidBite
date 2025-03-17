import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Github } from 'lucide-react';
import Cart from '../Cart';
import Swal from 'sweetalert2';

const FullScreenLoader = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg flex flex-col items-center">
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
            />
            <p className="mt-4 text-lg font-medium text-gray-700">Please wait...</p>
        </div>
    </div>
);

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const url = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (!isLogin && password !== confirmPassword) {
                throw new Error('Passwords do not match');
            }
            else if(isLogin){
                try{
                    const response = await fetch(`${url}/login`, {
                        method: 'POST',
                        body: JSON.stringify({ email, password }),
                        headers: {
                        'Content-Type': 'application/json',
                    },
                }); 
                const data = await response.json();
                if(data.token){
                    console.log(data);
                    localStorage.setItem('token', data.token);
                    await Swal.fire({
                        icon: 'success',
                        title: 'Welcome back!',
                        text: data.message || 'Successfully logged in!',
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl',
                            title: 'text-green-600',
                        }
                    });
                    navigate('/', { replace: true });
                }
                else{
                    await Swal.fire({
                        icon: 'error',
                        title: 'Login Failed',
                        text: data.message || 'Invalid credentials',
                        confirmButtonColor: '#22c55e',
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    });
                }
                }catch(error){
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message || 'An error occurred during login',
                        confirmButtonColor: '#22c55e',
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    });
                    setError(error.message);
                }
            }
            else{
                try{
                    const response = await fetch(`${url}/signup`, {
                        method: 'POST',
                        body: JSON.stringify({ name, email, password }),
                        headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                if(response.ok){
                    await Swal.fire({
                        icon: 'success',
                        title: 'Welcome!',
                        text: data.message || 'Account created successfully!',
                        timer: 2000,
                        showConfirmButton: false,
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl',
                            title: 'text-green-600',
                        }
                    });
                    window.location.reload();
                } else {
                    await Swal.fire({
                        icon: 'error',
                        title: 'Registration Failed',
                        text: data.message || 'Failed to create account',
                        confirmButtonColor: '#22c55e',
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    });
                }
                }catch(error){
                    await Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message || 'An error occurred during signup',
                        confirmButtonColor: '#22c55e',
                        background: '#fff',
                        customClass: {
                            popup: 'rounded-xl'
                        }
                    });
                    setError(error.message);
                }
            }
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: err.message || 'An error occurred',
                confirmButtonColor: '#22c55e',
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl'
                }
            });
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            // Add Google login logic here
            await new Promise(resolve => setTimeout(resolve, 1000));
            await Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Successfully logged in with Google!',
                timer: 2000,
                showConfirmButton: false,
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl',
                    title: 'text-green-600',
                }
            });
            navigate('/', { replace: true });
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to login with Google',
                confirmButtonColor: '#22c55e',
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl'
                }
            });
            setError('Failed to login with Google');
        } finally {
            setLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        setLoading(true);
        try {
            // Add GitHub login logic here
            await new Promise(resolve => setTimeout(resolve, 1000));
            await Swal.fire({
                icon: 'success',
                title: 'Welcome!',
                text: 'Successfully logged in with GitHub!',
                timer: 2000,
                showConfirmButton: false,
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl',
                    title: 'text-green-600',
                }
            });
            navigate('/', { replace: true });
        } catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to login with GitHub',
                confirmButtonColor: '#22c55e',
                background: '#fff',
                customClass: {
                    popup: 'rounded-xl'
                }
            });
            setError('Failed to login with GitHub');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {loading && <FullScreenLoader />}
            </AnimatePresence>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-whte to-green-50 p-4 mt-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md h-fit mt-8"
                >
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-center mb-8"
                        >
                            <h1 className="text-3xl font-bold text-gray-800 font-poppins">
                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {isLogin
                                    ? 'Please sign in to continue'
                                    : 'Please fill in the form to continue'}
                            </p>
                        </motion.div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 flex items-center text-sm"
                            >
                                <span className="mr-2">⚠️</span>
                                {error}
                            </motion.div>
                        )}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="space-y-4 mb-6"
                        >
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                <span className="text-gray-700 font-medium font-poppins">
                                    Continue with Google
                                </span>
                            </button>

                            <button
                                onClick={handleGithubLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <Github className="w-5 h-5" />
                                <span className="text-gray-700 font-medium font-poppins">
                                    Continue with GitHub
                                </span>
                            </button>
                        </motion.div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </motion.div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="relative"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="relative"
                            >
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </motion.div>

                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative"
                                >
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="pl-10 w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5 text-gray-400" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-400" />
                                        )}
                                    </button>
                                </motion.div>
                            )}

                            <motion.button
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        <span className="font-poppins">Processing...</span>
                                    </>
                                ) : (
                                    <span className="font-poppins">{isLogin ? 'Sign In' : 'Create Account'}</span>
                                )}
                            </motion.button>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center mt-6"
                            >
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                                >
                                    {isLogin
                                        ? "Don't have an account? Sign Up"
                                        : 'Already have an account? Sign In'}
                                </button>
                            </motion.div>
                        </form>
                    </div>
                </motion.div>
                <Cart />
            </div>
        </>
    );
};

export default Auth;