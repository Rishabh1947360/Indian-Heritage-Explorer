import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { User, Mail, Lock, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { User as UserType } from '../App';

interface SignupPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  onSignup: (user: UserType) => void;
  registeredUsers: UserType[];
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir'
];

export function SignupPage({ onNavigate, onSignup, registeredUsers }: SignupPageProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    state: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Check if email already exists
    const emailExists = registeredUsers.some(user => user.email.toLowerCase() === formData.email.toLowerCase());
    if (emailExists) {
      setError('An account with this email already exists. Please login or use a different email.');
      return;
    }
    
    // Validate password and confirm password
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Register the user
    const newUser: UserType = {
      email: formData.email,
      password: formData.password,
      name: formData.fullName,
    };
    onSignup(newUser);
    
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
        <Navbar onNavigate={onNavigate} currentPage="signup" showAuthButtons={false} />
        
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="mb-4 text-gray-800">Registration Successful!</h2>
              
              <p className="text-gray-600 mb-2">
                A verification email has been sent to:
              </p>
              <p className="text-[#FF9933] mb-8">{formData.email}</p>
              
              <p className="text-sm text-gray-500 mb-8">
                Please check your inbox and verify your email address to complete the registration.
              </p>

              <RippleButton 
                onClick={() => onNavigate('login')} 
                variant="primary"
                className="w-full"
              >
                Continue to Login
              </RippleButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="signup" showAuthButtons={false} />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF9933] via-[#FF9933] to-[#138808] p-8 text-white text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl">
                🇮🇳
              </div>
              <h2 className="mb-2">Create Account</h2>
              <p className="text-white/90">Join India's heritage community</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div>
                <label className="block text-gray-700 mb-2">
                  <User className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <Mail className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <Lock className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <Lock className="inline w-5 h-5 mr-2 text-[#138808]" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#138808] focus:outline-none transition-colors"
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <Phone className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  <MapPin className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  State
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors bg-white"
                  required
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <RippleButton type="submit" variant="primary" className="w-full mt-6">
                Register
              </RippleButton>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className="text-[#FF9933] hover:text-[#FF7700] transition-colors"
                >
                  Already have an account? Login
                </button>
              </div>
            </form>
          </div>

          <div className="text-center mt-6">
            <button
              onClick={() => onNavigate('landing')}
              className="text-gray-600 hover:text-[#FF9933] transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}