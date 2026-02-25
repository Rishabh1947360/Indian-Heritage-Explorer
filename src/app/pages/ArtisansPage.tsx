import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { ArrowLeft, MapPin, Phone, Mail, Award, Filter } from 'lucide-react';
import { Artisan } from '../App';

interface ArtisansPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  userName: string;
  registeredArtisans: Artisan[];
  onLogout: () => void;
}

const DEFAULT_ARTISANS = [
  {
    id: 1,
    name: 'Ramesh Kumar',
    craft: 'Traditional Pottery',
    state: 'Rajasthan',
    location: 'Jaipur',
    experience: '25 years',
    phone: '+91 98765 43210',
    email: 'ramesh.pottery@example.com',
    image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwdHJhZGl0aW9uYWwlMjBjcmFmdHxlbnwxfHx8fDE3NzE4Njc1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Blue pottery - Traditional Rajasthani technique',
  },
  {
    id: 2,
    name: 'Lakshmi Devi',
    craft: 'Handloom Weaving',
    state: 'Tamil Nadu',
    location: 'Kanchipuram',
    experience: '30 years',
    phone: '+91 98765 43211',
    email: 'lakshmi.weaving@example.com',
    image: 'https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZyUyMGhhbmRsb29tfGVufDF8fHx8MTc3MTg2NzU3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Kanchipuram silk sarees with traditional motifs',
  },
  {
    id: 3,
    name: 'Suresh Patel',
    craft: 'Metal Craftsmanship',
    state: 'Gujarat',
    location: 'Vadodara',
    experience: '20 years',
    phone: '+91 98765 43212',
    email: 'suresh.metalcraft@example.com',
    image: 'https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnQlMjB3b3JrZXJ8ZW58MXx8fHwxNzcxODY3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Bronze sculptures and temple artifacts',
  },
  {
    id: 4,
    name: 'Meera Sharma',
    craft: 'Miniature Painting',
    state: 'Rajasthan',
    location: 'Udaipur',
    experience: '15 years',
    phone: '+91 98765 43213',
    email: 'meera.painting@example.com',
    image: 'https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnQlMjB3b3JrZXJ8ZW58MXx8fHwxNzcxODY3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Mughal-era miniature paintings on silk',
  },
  {
    id: 5,
    name: 'Vijay Naidu',
    craft: 'Wood Carving',
    state: 'Karnataka',
    location: 'Mysore',
    experience: '28 years',
    phone: '+91 98765 43214',
    email: 'vijay.woodcraft@example.com',
    image: 'https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnQlMjB3b3JrZXJ8ZW58MXx8fHwxNzcxODY3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Sandalwood carvings and decorative panels',
  },
  {
    id: 6,
    name: 'Anita Reddy',
    craft: 'Textile Embroidery',
    state: 'Uttar Pradesh',
    location: 'Lucknow',
    experience: '22 years',
    phone: '+91 98765 43215',
    email: 'anita.embroidery@example.com',
    image: 'https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZyUyMGhhbmRsb29tfGVufDF8fHx8MTc3MTg2NzU3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Chikankari embroidery on fine fabrics',
  },
  {
    id: 7,
    name: 'Priya Menon',
    craft: 'Traditional Pottery',
    state: 'Kerala',
    location: 'Thrissur',
    experience: '18 years',
    phone: '+91 98765 43216',
    email: 'priya.pottery@example.com',
    image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwdHJhZGl0aW9uYWwlMjBjcmFmdHxlbnwxfHx8fDE3NzE4Njc1NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Kerala traditional terracotta pottery',
  },
  {
    id: 8,
    name: 'Arjun Singh',
    craft: 'Stone Carving',
    state: 'Delhi',
    location: 'New Delhi',
    experience: '32 years',
    phone: '+91 98765 43217',
    email: 'arjun.stone@example.com',
    image: 'https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnQlMjB3b3JrZXJ8ZW58MXx8fHwxNzcxODY3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Mughal-style marble and sandstone carving',
  },
  {
    id: 9,
    name: 'Kavita Joshi',
    craft: 'Handloom Weaving',
    state: 'Maharashtra',
    location: 'Aurangabad',
    experience: '24 years',
    phone: '+91 98765 43218',
    email: 'kavita.weaving@example.com',
    image: 'https://images.unsplash.com/photo-1611574557351-00889b20a36b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmluZyUyMGhhbmRsb29tfGVufDF8fHx8MTc3MTg2NzU3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    specialty: 'Paithani sarees with gold thread work',
  },
];

const INDIAN_STATES = [
  'All States',
  'Uttar Pradesh',
  'Karnataka',
  'Delhi',
  'Rajasthan',
  'Maharashtra',
  'Kerala',
  'Tamil Nadu',
  'Gujarat',
];

export function ArtisansPage({ onNavigate, userName, registeredArtisans, onLogout }: ArtisansPageProps) {
  const [selectedState, setSelectedState] = useState('All States');
  
  // Combine default artisans with registered artisans
  const allArtisans = [...DEFAULT_ARTISANS, ...registeredArtisans];
  
  // Filter artisans by state
  const filteredArtisans = selectedState === 'All States'
    ? allArtisans
    : allArtisans.filter(artisan => artisan.state === selectedState);

  // Get count of artisans per state
  const getStateCount = (state: string) => {
    if (state === 'All States') return allArtisans.length;
    return allArtisans.filter(a => a.state === state).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="artisans" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('dashboard')}
              className="p-2 rounded-full hover:bg-white/80 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-[#FF9933]" />
            </button>
            <div>
              <h1 className="text-gray-800 flex items-center gap-2">
                🎨 Traditional Artisans
              </h1>
              <p className="text-gray-600 mt-1">Connect with India's master craftspeople</p>
            </div>
          </div>
          
          {/* Register Button */}
          <RippleButton
            onClick={() => onNavigate('artisan-registration')}
            variant="primary"
            className="whitespace-nowrap"
          >
            Register as Artisan
          </RippleButton>
        </div>

        {/* State Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-[#FF9933]" />
            <h3 className="text-gray-800">Filter by State</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {INDIAN_STATES.map((state) => {
              const count = getStateCount(state);
              return (
                <button
                  key={state}
                  onClick={() => setSelectedState(state)}
                  className={`px-4 py-2 rounded-full transition-all ${
                    selectedState === state
                      ? 'bg-gradient-to-r from-[#FF9933] to-[#138808] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-6 bg-gradient-to-r from-[#FF9933] to-[#138808] rounded-2xl shadow-lg text-white">
          <h3 className="mb-2">Preserve Our Heritage</h3>
          <p className="text-white/90">
            Support traditional Indian artisans by connecting with them directly. 
            Each artisan represents generations of knowledge and skill passed down through centuries.
          </p>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <strong>{filteredArtisans.length}</strong> artisan{filteredArtisans.length !== 1 ? 's' : ''} 
            {selectedState !== 'All States' && ` in ${selectedState}`}
          </p>
        </div>

        {/* Artisans Grid */}
        {filteredArtisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <div
                key={artisan.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Craft Badge */}
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#FF9933]">
                    {artisan.craft}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-gray-800 mb-1">{artisan.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-[#FF9933]" />
                        {artisan.location}, {artisan.state}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-[#FFD700]">
                      <Award className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="mb-4 px-3 py-2 bg-gradient-to-r from-[#FFF8DC] to-white rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Experience:</strong> {artisan.experience}
                    </p>
                  </div>

                  {/* Specialty */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {artisan.specialty}
                  </p>

                  {/* Contact Info */}
                  <div className="space-y-2 pt-4 border-t border-gray-200">
                    <a
                      href={`tel:${artisan.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF9933] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {artisan.phone}
                    </a>
                    <a
                      href={`mailto:${artisan.email}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF9933] transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      {artisan.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-4">No artisans found in {selectedState}.</p>
            <p className="text-sm text-gray-500">Try selecting a different state or view all artisans.</p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 p-8 bg-white rounded-2xl shadow-lg text-center">
          <h2 className="mb-4 text-gray-800">Are you a traditional artisan?</h2>
          <p className="text-gray-600 mb-6">
            Join our platform to showcase your crafts and connect with heritage enthusiasts across India.
          </p>
          <RippleButton
            onClick={() => onNavigate('artisan-registration')}
            variant="primary"
          >
            Register as Artisan
          </RippleButton>
        </div>
      </div>
    </div>
  );
}