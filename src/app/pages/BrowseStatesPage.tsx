import React from 'react';
import { Navbar } from '../components/Navbar';
import { ArrowLeft, MapPin } from 'lucide-react';
import { HERITAGE_SITES_BY_STATE } from '../data/heritageSites';

interface BrowseStatesPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  userName: string;
  onLogout: () => void;
}

const INDIAN_STATES = [
  { name: 'Uttar Pradesh', image: 'https://images.unsplash.com/photo-1698824834792-b50f1747730a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWolMjBtYWhhbCUyMGluZGlhJTIwaGVyaXRhZ2V8ZW58MXx8fHwxNzcxODY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Karnataka', image: 'https://images.unsplash.com/photo-1616671832048-a8becc25bb13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW1waSUyMHJ1aW5zJTIwaW5kaWF8ZW58MXx8fHwxNzcxODY3NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Delhi', image: 'https://images.unsplash.com/photo-1713590781837-788d6e2c448f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBmb3J0JTIwZGVsaGklMjBpbmRpYXxlbnwxfHx8fDE3NzE4NTY1MTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1534407672671-e77ce1342dc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWlwdXIlMjBoYXdhJTIwbWFoYWwlMjByYWphc3RoYW58ZW58MXx8fHwxNzcxODY3NTc4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Maharashtra', image: 'https://images.unsplash.com/photo-1649052894514-7c287bd147e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhamFudGElMjBjYXZlcyUyMGluZGlhfGVufDF8fHx8MTc3MTg2NzU3NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Kerala', image: 'https://images.unsplash.com/photo-1719416680724-219b4fdc4ce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxteXNvcmUlMjBwYWxhY2UlMjBpbmRpYXxlbnwxfHx8fDE3NzE4NTY1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Tamil Nadu', image: 'https://images.unsplash.com/photo-1739356025254-ef2fd922e0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXR1YiUyMG1pbmFyJTIwaW5kaWElMjBtb251bWVudHxlbnwxfHx8fDE3NzE4Njc1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Gujarat', image: 'https://images.unsplash.com/photo-1708172143882-fc766c585320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW5pJTIwa2klMjB2YXYlMjBzdGVwd2VsbCUyMHBhdGFuJTIwZ3VqYXJhdHxlbnwxfHx8fDE3NzE5NjY2OTV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'West Bengal', image: 'https://images.unsplash.com/photo-1732127956178-aac9a86a5396?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQmVuZ2FsJTIwaGVyaXRhZ2UlMjBLb2xrYXRhJTIwSW5kaWF8ZW58MXx8fHwxNzcxOTk5Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Madhya Pradesh', image: 'https://images.unsplash.com/photo-1671375159250-8f81a29e54e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWRoeWElMjBQcmFkZXNoJTIwS2hhanVyYWhvJTIwdGVtcGxlJTIwSW5kaWF8ZW58MXx8fHwxNzcxOTk5Njc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Punjab', image: 'https://images.unsplash.com/photo-1757552528834-09a6e8c7c9ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQdW5qYWIlMjBHb2xkZW4lMjBUZW1wbGUlMjBBbXJpdHNhciUyMEluZGlhfGVufDF8fHx8MTc3MTk5OTY3NHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Odisha', image: 'https://images.unsplash.com/photo-1677211352662-30e7775c7ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPZGlzaGElMjBLb25hcmslMjBTdW4lMjBUZW1wbGUlMjBJbmRpYXxlbnwxfHx8fDE3NzE5OTk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Telangana', image: 'https://images.unsplash.com/photo-1732449102690-5d48670c62dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUZWxhbmdhbmElMjBDaGFybWluYXIlMjBIeWRlcmFiYWQlMjBJbmRpYXxlbnwxfHx8fDE3NzE5OTk2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Bihar', image: 'https://images.unsplash.com/photo-1747224652373-8b97724573c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCaWhhciUyMEJvZGglMjBHYXlhJTIwdGVtcGxlJTIwSW5kaWF8ZW58MXx8fHwxNzcxOTk5Njc2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Assam', image: 'https://images.unsplash.com/photo-1759738102595-f01aa8b4b53e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYSUyMG5vcnRoZWFzdCUyMGdyZWVuJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MTk5OTY4MXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Himachal Pradesh', image: 'https://images.unsplash.com/photo-1664109074701-6c95090e852e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hY2hhbCUyMFByYWRlc2glMjBtb3VudGFpbnMlMjBTaGltbGElMjBJbmRpYXxlbnwxfHx8fDE3NzE5OTk2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Uttarakhand', image: 'https://images.unsplash.com/photo-1704447357059-0d1d865cfeff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVdHRhcmFraGFuZCUyMEhpbWFsYXlhJTIwbW91bnRhaW4lMjBJbmRpYXxlbnwxfHx8fDE3NzE5OTk2Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Goa', image: 'https://images.unsplash.com/photo-1718275520594-8bb2d4fae9f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHb2ElMjBjaHVyY2glMjBoZXJpdGFnZSUyMGJlYWNoJTIwSW5kaWF8ZW58MXx8fHwxNzcxOTk5Njc4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Sikkim', image: 'https://images.unsplash.com/photo-1677820915366-27d887c9b872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxIaW1hbGF5YSUyMG1vdW50YWluJTIwc25vdyUyMHBlYWslMjBJbmRpYXxlbnwxfHx8fDE3NzE5OTk2ODF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Chandigarh', image: 'https://images.unsplash.com/photo-1647859680682-6fbd3d3bbd31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGFuZGlnYXJoJTIwbW9kZXJuJTIwY2l0eSUyMEluZGlhJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTk5OTY4Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
];

export function BrowseStatesPage({ onNavigate, userName, onLogout }: BrowseStatesPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="browse-states" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#FF9933]" />
          </button>
          <div>
            <h1 className="text-gray-800 flex items-center gap-2">
              <MapPin className="text-[#FF9933]" />
              Browse by State
            </h1>
            <p className="text-gray-600 mt-1">Discover heritage sites across India</p>
          </div>
        </div>

        {/* States Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDIAN_STATES.map((state) => {
            const sitesCount = HERITAGE_SITES_BY_STATE[state.name]?.length || 0;
            return (
              <button
                key={state.name}
                onClick={() => onNavigate('site-detail', state.name)}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={state.image}
                    alt={state.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="mb-1">{state.name}</h3>
                  <p className="text-sm text-white/90">
                    {sitesCount} Heritage Site{sitesCount !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm text-[#FF9933]">{sitesCount}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="mb-4 text-gray-800">Explore India's Rich Cultural Heritage</h2>
          <p className="text-gray-600 mb-4">
            From the snow-capped Himalayas to the tropical beaches of Kerala, India's diverse 
            states offer a treasure trove of historical monuments, ancient temples, and 
            architectural wonders that tell the story of our glorious past.
          </p>
          <p className="text-gray-600">
            Click on any state to discover its heritage sites, check live traffic status, 
            and book your cultural journey today!
          </p>
        </div>
      </div>
    </div>
  );
}