import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { Mail, Lock, Shield, AlertCircle } from 'lucide-react';
import { User } from '../App';

interface LoginPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  onLogin: (email: string) => void;
  registeredUsers: User[];
}

export function LoginPage({ onNavigate, onLogin, registeredUsers }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!showOtp) {
      // Check if user exists in registered users
      const user = registeredUsers.find(u => u.email === email);
      
      if (!user) {
        setError('No account found with this email. Please create an account first.');
        return;
      }
      
      if (user.password !== password) {
        setError('Incorrect password. Please try again.');
        return;
      }
      
      // If credentials are correct, show OTP screen
      setShowOtp(true);
    } else {
      // Verify OTP (simulated)
      const user = registeredUsers.find(u => u.email === email);
      if (user) {
        onLogin(user.name);
        onNavigate('dashboard');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="login" showAuthButtons={false} />
      
      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#FF9933] via-[#FF9933] to-[#138808] p-8 text-white text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl">
                🕉️
              </div>
              <h2 className="mb-2">Welcome Back</h2>
              <p className="text-white/90">Sign in to continue your heritage journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 mb-2">
                  <Mail className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {showOtp && (
                <div className="animate-in fade-in duration-300">
                  <label className="block text-gray-700 mb-2">
                    <Shield className="inline w-5 h-5 mr-2 text-[#138808]" />
                    OTP Verification
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#138808] focus:outline-none transition-colors text-center tracking-widest"
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    OTP sent to {email}
                  </p>
                </div>
              )}

              <RippleButton type="submit" variant="primary" className="w-full">
                {showOtp ? 'Verify & Login' : 'Continue'}
              </RippleButton>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => onNavigate('signup')}
                  className="text-[#FF9933] hover:text-[#FF7700] transition-colors"
                >
                  Don't have an account? Create one
                </button>
              </div>
            </form>
          </div>

          {/* Back to Home */}
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