// components/login/LoginModal.tsx
'use client';

import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  message?: string;
}

const LoginModal: React.FC<LoginModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  message = "Please login to continue" 
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleGoogleLogin = () => {
    window.location.href = 'https://api.your-ecommerce-site.com/auth/google';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login logic
        await login(formData.email, formData.password);
        onLoginSuccess();
      } else {
        // Signup logic - you'll need to implement this in your AuthContext
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        // Mock signup - replace with actual signup API call
        console.log('Sign up with:', formData);
        // After successful signup, you might want to auto-login
        await login(formData.email, formData.password);
        onLoginSuccess();
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        {/* Login Card */}
        <div className="relative rounded-2xl bg-[#2C1B12] p-8 shadow-2xl border border-white/10">
          {/* Close button - Moved inside the card to top right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#A58E7C] hover:text-[#E3C5A5] transition-colors z-20 bg-[#2C1B12]/80 rounded-full p-1"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          {/* The "Glow": Soft radial gradient in the upper-left quadrant */}
          <div 
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px] opacity-40"
            style={{ background: 'radial-gradient(circle, #E3C5A5 0%, transparent 70%)' }}
          />

          {/* Message */}
          {message && (
            <div className="relative z-10 mb-6 text-center">
              <p className="text-[#E3C5A5] text-sm">{message}</p>
            </div>
          )}

          <div className="relative z-10 text-center mb-8">
            <h1 className="text-3xl font-serif text-[#E3C5A5] mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-[#A58E7C] text-sm">
              {isLogin 
                ? 'Sign in to continue your shopping journey' 
                : 'Join us for a seamless shopping experience'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="relative z-10 mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-xs text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
            {/* Name field - only shown for signup */}
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#A58E7C] focus:outline-none focus:border-[#E3C5A5] transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#A58E7C] focus:outline-none focus:border-[#E3C5A5] transition-colors"
                required
              />
            </div>

            {/* Password field */}
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#A58E7C] focus:outline-none focus:border-[#E3C5A5] transition-colors"
                required
              />
            </div>

            {/* Confirm Password - only shown for signup */}
            {!isLogin && (
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-[#A58E7C] focus:outline-none focus:border-[#E3C5A5] transition-colors"
                  required={!isLogin}
                />
              </div>
            )}

            {/* Forgot Password - only for login */}
            {isLogin && (
              <div className="text-right">
                <button 
                  type="button"
                  className="text-sm text-[#A58E7C] hover:text-[#E3C5A5] transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E3C5A5] hover:bg-[#D4B494] text-[#2C1B12] font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {/* Toggle between Login and Signup */}
          <div className="relative z-10 text-center mt-4">
            <p className="text-[#A58E7C] text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#E3C5A5] hover:underline font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>

          <div className="relative z-10 my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#2C1B12] px-2 text-[#A58E7C]">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="relative z-10 w-full flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-[#E3C5A5] font-semibold py-3 px-4 rounded-lg border border-white/20 transition-all duration-300"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          <p className="relative z-10 text-center text-xs text-[#A58E7C] mt-6 px-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      {/* Deep Umber edge shading */}
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-[#1A0F0A] to-transparent pointer-events-none" />
    </div>
  );
};

export default LoginModal;