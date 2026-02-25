import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeritageCard } from '../components/HeritageCard';
import { Map, Calendar, Activity, Palette, TrendingUp } from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  userName: string;
  onLogout: () => void;
}

const POPULAR_SITES = [
  {
    id: 1,
    name: 'Taj Mahal',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1698824834792-b50f1747730a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcxODY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'One of the Seven Wonders of the World',
  },
  {
    id: 2,
    name: 'Hampi Ruins',
    state: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1616671832048-a8becc25bb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1waSUyMHJ1aW5zJTIwaW5kaWF8ZW58MXx8fHwxNzcxODY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Ancient Vijayanagara Empire capital',
  },
  {
    id: 3,
    name: 'Red Fort',
    state: 'Delhi',
    image: 'https://images.unsplash.com/photo-1713590781837-788d6e2c448f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBmb3J0JTIwZGVsaGklMjBpbmRpYXxlbnwxfHx8fDE3NzE4NTY1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Historic Mughal fortification',
  },
  {
    id: 4,
    name: 'Qutub Minar',
    state: 'Delhi',
    image: 'https://images.unsplash.com/photo-1739356025254-ef2fd922e0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXR1YiUyMG1pbmFyJTIwaW5kaWElMjBtb251bWVudHxlbnwxfHx8fDE3NzE4Njc1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Tallest brick minaret in the world',
  },
];

export function DashboardPage({ onNavigate, userName, onLogout }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="dashboard" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-8 bg-gradient-to-r from-[#FF9933] to-[#138808] rounded-3xl shadow-lg text-white">
          <h1 className="mb-2">Welcome, {userName}! 🙏</h1>
          <p className="text-white/90">Explore India's magnificent heritage and book your next cultural journey</p>
        </div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <button
            onClick={() => onNavigate('browse-states')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-[#FF9933] to-[#FF7700] flex items-center justify-center">
              <Map className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-gray-800">Browse by State</h3>
            <p className="text-sm text-gray-600">Explore heritage sites across India</p>
          </button>

          <button
            onClick={() => onNavigate('my-bookings')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-[#138808] to-[#0d6006] flex items-center justify-center">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-gray-800">My Bookings</h3>
            <p className="text-sm text-gray-600">View and manage your tours</p>
          </button>

          <button
            onClick={() => onNavigate('browse-states')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-[#000080] to-[#000060] flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-gray-800">Live Traffic</h3>
            <p className="text-sm text-gray-600">Check real-time site traffic</p>
          </button>

          <button
            onClick={() => onNavigate('artisans')}
            className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-left"
          >
            <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
              <Palette className="w-7 h-7 text-white" />
            </div>
            <h3 className="mb-2 text-gray-800">Artisans</h3>
            <p className="text-sm text-gray-600">Discover traditional crafts</p>
          </button>
        </div>

        {/* Popular Heritage Sites */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="flex items-center gap-2 text-gray-800">
              <TrendingUp className="text-[#FF9933]" />
              Popular Heritage Sites
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_SITES.map((site) => (
              <HeritageCard
                key={site.id}
                title={site.name}
                description={site.description}
                image={site.image}
                onClick={() => {
                  onNavigate('site-detail');
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-[#FF9933] to-[#FF7700] bg-clip-text text-transparent">2,547</div>
            <p className="text-gray-600">Heritage Sites</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-[#138808] to-[#0d6006] bg-clip-text text-transparent">15,890</div>
            <p className="text-gray-600">Registered Artisans</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
            <div className="text-4xl mb-2 bg-gradient-to-r from-[#000080] to-[#000060] bg-clip-text text-transparent">1.2M+</div>
            <p className="text-gray-600">Annual Visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
}