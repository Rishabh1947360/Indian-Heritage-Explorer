import React from 'react';
import { RippleButton } from '../components/RippleButton';
import { Navbar } from '../components/Navbar';

interface LandingPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="landing" />
      
      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1698824834792-b50f1747730a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcxODY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center space-x-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <span className="text-2xl">🇮🇳</span>
              <span className="text-white">Discover India's Rich Heritage</span>
            </div>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl mb-6 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] bg-clip-text text-transparent drop-shadow-lg">
            Indian Heritage
          </h1>
          
          <p className="text-2xl sm:text-3xl text-white mb-8 drop-shadow-lg">
            Explore the Pride of India
          </p>
          
          <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
            Journey through centuries of culture, discover magnificent monuments, 
            and connect with traditional artisans across the nation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <RippleButton 
              onClick={() => onNavigate('login')} 
              variant="primary"
              className="w-full sm:w-auto min-w-[200px]"
            >
              Login
            </RippleButton>
            <RippleButton 
              onClick={() => onNavigate('signup')} 
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] !bg-white/20 !border-white !text-white hover:!bg-white/30"
            >
              Create Account
            </RippleButton>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF8DC] to-transparent" />
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-center mb-12 bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">
          Why Choose Indian Heritage?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="mb-3 text-gray-800">Heritage Sites</h3>
            <p className="text-gray-600">Explore UNESCO World Heritage Sites and historical monuments across India</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="mb-3 text-gray-800">Traditional Artisans</h3>
            <p className="text-gray-600">Connect with skilled artisans preserving India's rich cultural traditions</p>
          </div>
          
          <div className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="text-5xl mb-4">📱</div>
            <h3 className="mb-3 text-gray-800">Easy Booking</h3>
            <p className="text-gray-600">Book tours with live traffic updates and manage your visits seamlessly</p>
          </div>
        </div>
      </div>
    </div>
  );
}
