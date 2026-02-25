import React from 'react';
import { Menu, X } from 'lucide-react';
import { RippleButton } from './RippleButton';

interface NavbarProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  currentPage: string;
  isLoggedIn?: boolean;
  userName?: string;
  showAuthButtons?: boolean;
  onLogout?: () => void;
}

export function Navbar({ onNavigate, currentPage, isLoggedIn, userName, showAuthButtons = true, onLogout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            onClick={() => onNavigate(isLoggedIn ? 'dashboard' : 'landing')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-white to-[#138808] flex items-center justify-center shadow-lg">
              <span className="text-[#000080]">🕉️</span>
            </div>
            <span className="text-xl bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">
              Indian Heritage
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isLoggedIn && (
              <>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  Contact
                </button>
              </>
            )}
            
            {isLoggedIn && userName && (
              <span className="text-gray-700">Welcome, {userName}!</span>
            )}

            {showAuthButtons && !isLoggedIn && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => onNavigate('login')}
                  className="text-[#FF9933] hover:text-[#FF7700] transition-colors"
                >
                  Login
                </button>
                <RippleButton onClick={() => onNavigate('signup')} variant="primary">
                  Create Account
                </RippleButton>
              </div>
            )}

            {isLoggedIn && (
              <RippleButton onClick={() => onLogout?.()} variant="outline">
                Logout
              </RippleButton>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-4">
            {!isLoggedIn && (
              <>
                <button 
                  onClick={() => {
                    onNavigate('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  About
                </button>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left py-2 text-gray-700 hover:text-[#FF9933] transition-colors"
                >
                  Contact
                </button>
              </>
            )}

            {showAuthButtons && !isLoggedIn && (
              <div className="space-y-2 pt-4 border-t">
                <button
                  onClick={() => {
                    onNavigate('login');
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 text-[#FF9933]"
                >
                  Login
                </button>
                <RippleButton 
                  onClick={() => {
                    onNavigate('signup');
                    setMobileMenuOpen(false);
                  }} 
                  variant="primary"
                  className="w-full"
                >
                  Create Account
                </RippleButton>
              </div>
            )}

            {isLoggedIn && (
              <RippleButton 
                onClick={() => onLogout?.()} 
                variant="outline"
                className="w-full"
              >
                Logout
              </RippleButton>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}