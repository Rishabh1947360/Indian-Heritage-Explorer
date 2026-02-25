import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { ArrowLeft, MapPin, Clock, Users, Calendar, Star, ChevronLeft, ChevronRight, Video, X } from 'lucide-react';
import { HERITAGE_SITES_BY_STATE, HeritageSite } from '../data/heritageSites';
import { getPanoramaUrl } from '../utils/videoMapping';
import { Image360Viewer } from '../components/Image360Viewer';

interface SiteDetailPageProps {
  onNavigate: (page: string, state?: string, siteId?: string, site?: HeritageSite) => void;
  userName: string;
  selectedState: string;
  selectedSiteId: string;
  selectedSite?: HeritageSite | null;
  onLogout: () => void;
}

export function SiteDetailPage({ onNavigate, userName, selectedState, selectedSiteId, selectedSite, onLogout }: SiteDetailPageProps) {
  const [traffic, setTraffic] = React.useState<'low' | 'moderate' | 'heavy'>('moderate');
  const [currentSiteIndex, setCurrentSiteIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  // Get sites for the selected state
  const stateSites = HERITAGE_SITES_BY_STATE[selectedState] || [];
  
  // If no sites available, default to first state with sites
  const sites = stateSites.length > 0 ? stateSites : HERITAGE_SITES_BY_STATE['Uttar Pradesh'];
  const currentSite: HeritageSite = sites[currentSiteIndex];

  // Set initial site based on selectedSiteId
  useEffect(() => {
    if (selectedSiteId && sites.length > 0) {
      const siteIndex = sites.findIndex(site => site.id === selectedSiteId);
      if (siteIndex !== -1) {
        setCurrentSiteIndex(siteIndex);
      }
    }
  }, [selectedSiteId, sites]);

  const handlePreviousSite = () => {
    setCurrentSiteIndex((prev) => (prev === 0 ? sites.length - 1 : prev - 1));
  };

  const handleNextSite = () => {
    setCurrentSiteIndex((prev) => (prev === sites.length - 1 ? 0 : prev + 1));
  };

  const trafficColors = {
    low: 'bg-green-500',
    moderate: 'bg-yellow-500',
    heavy: 'bg-red-500',
  };

  const trafficLabels = {
    low: 'Low Traffic',
    moderate: 'Moderate Traffic',
    heavy: 'Heavy Traffic',
  };

  if (!currentSite) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
        <Navbar onNavigate={onNavigate} currentPage="site-detail" isLoggedIn userName={userName} onLogout={onLogout} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-gray-600">No heritage sites found for this state.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="site-detail" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('browse-states')}
          className="flex items-center gap-2 mb-6 text-[#FF9933] hover:text-[#FF7700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to States
        </button>

        {/* Site Navigation */}
        {sites.length > 1 && (
          <div className="mb-6 flex items-center justify-between bg-white rounded-xl p-4 shadow-md">
            <button
              onClick={handlePreviousSite}
              className="flex items-center gap-2 px-4 py-2 text-[#FF9933] hover:bg-[#FFF8DC] rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous Site
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-500">Viewing site {currentSiteIndex + 1} of {sites.length}</p>
              <p className="text-gray-800">{selectedState || currentSite.state}</p>
            </div>
            <button
              onClick={handleNextSite}
              className="flex items-center gap-2 px-4 py-2 text-[#FF9933] hover:bg-[#FFF8DC] rounded-lg transition-colors"
            >
              Next Site
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Hero Image */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl mb-8">
          <div className="aspect-[21/9] md:aspect-[21/9]">
            <img
              src={currentSite.image}
              alt={currentSite.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Traffic Indicator */}
          <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <div className={`w-3 h-3 rounded-full ${trafficColors[traffic]} animate-pulse`} />
            <span className="text-sm text-gray-800">{trafficLabels[traffic]}</span>
          </div>

          {/* UNESCO Badge */}
          {currentSite.unesco && (
            <div className="absolute top-6 left-6 bg-[#0055A4]/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm text-white font-medium">UNESCO World Heritage</span>
            </div>
          )}

          {/* Site Name Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{currentSite.location}, {currentSite.state}</span>
            </div>
            <h1 className="mb-2">{currentSite.name}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                {currentSite.rating} ({currentSite.reviews.toLocaleString()} reviews)
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-5 h-5" />
                Built: {currentSite.yearBuilt}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="mb-4 text-gray-800">About This Heritage Site</h2>
              <p className="text-gray-600 whitespace-pre-line">
                {currentSite.description}
              </p>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="mb-4 text-gray-800">Visitor Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#FF9933] mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Opening Hours</div>
                    <div className="text-gray-800">{currentSite.openingHours}</div>
                    {currentSite.closedOn !== 'None' && (
                      <div className="text-sm text-red-500">Closed on {currentSite.closedOn}</div>
                    )}
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#FF9933] mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Daily Visitors</div>
                    <div className="text-gray-800">~{currentSite.dailyVisitors}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#FF9933] mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Best Time to Visit</div>
                    <div className="text-gray-800">{currentSite.bestTime}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF9933] mt-1" />
                  <div>
                    <div className="text-sm text-gray-500">Entry Fee</div>
                    <div className="text-gray-800">{currentSite.entryFee.indian} (Indians)</div>
                    <div className="text-gray-800">{currentSite.entryFee.foreign} (Foreigners)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Sites in State */}
            {sites.length > 1 && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="mb-4 text-gray-800">Other Sites in {currentSite.state}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sites.map((site, index) => (
                    index !== currentSiteIndex && (
                      <button
                        key={site.id}
                        onClick={() => setCurrentSiteIndex(index)}
                        className="group relative overflow-hidden rounded-xl bg-gray-50 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={site.image}
                            alt={site.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h4 className="text-sm mb-1">{site.name}</h4>
                          <p className="text-xs text-white/90">{site.location}</p>
                        </div>
                      </button>
                    )
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 sticky top-24">
              <h3 className="mb-6 text-gray-800">Book Your Visit</h3>
              
              {/* Traffic Status */}
              <div className="mb-6 p-4 rounded-xl bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Current Traffic</span>
                  <button
                    onClick={() => {
                      const statuses: Array<'low' | 'moderate' | 'heavy'> = ['low', 'moderate', 'heavy'];
                      const currentIndex = statuses.indexOf(traffic);
                      const nextIndex = (currentIndex + 1) % statuses.length;
                      setTraffic(statuses[nextIndex]);
                    }}
                    className="text-xs text-[#FF9933] hover:text-[#FF7700]"
                  >
                    Refresh
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${trafficColors[traffic]} animate-pulse`} />
                  <span className="text-gray-800">{trafficLabels[traffic]}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <RippleButton
                  onClick={() => setShowVirtualTour(true)}
                  variant="primary"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <Video className="w-5 h-5" />
                  Virtual Tour
                </RippleButton>

                <RippleButton
                  onClick={() => onNavigate('booking', undefined, undefined, currentSite)}
                  variant="outline"
                  className="w-full"
                >
                  Book Tour
                </RippleButton>
                
                <RippleButton
                  onClick={() => onNavigate('my-bookings')}
                  variant="outline"
                  className="w-full"
                >
                  View My Bookings
                </RippleButton>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  💡 <strong>Tip:</strong> Book early morning slots for fewer crowds and better lighting!
                </p>
                <p className="text-sm text-gray-600">
                  📸 Photography is allowed but tripods may require special permission.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Tour Modal */}
        {showVirtualTour && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={(e) => {
              // Close modal when clicking on backdrop
              if (e.target === e.currentTarget) {
                setShowVirtualTour(false);
              }
            }}
          >
            <div className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF9933] to-[#138808] p-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-3 text-white">
                  <Video className="w-6 h-6" />
                  <div>
                    <h3 className="mb-0">Virtual Tour</h3>
                    <p className="text-sm text-white/90">{currentSite.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVirtualTour(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close virtual tour"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-2xl mb-6 overflow-hidden relative">
                  {(() => {
                    const panoramaUrl = getPanoramaUrl(currentSite.id);
                    
                    if (panoramaUrl) {
                      // Google Maps Street View panorama
                      return (
                        <iframe
                          className="w-full h-full rounded-2xl"
                          src={panoramaUrl}
                          title={`360° Virtual Tour of ${currentSite.name}`}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      );
                    } else {
                      // Fallback to image
                      return (
                        <div className="w-full h-full flex items-center justify-center">
                          <img src={currentSite.image} alt={currentSite.name} className="w-full h-full object-cover rounded-2xl" />
                        </div>
                      );
                    }
                  })()}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-[#FFF8DC] p-4 rounded-xl">
                    <h4 className="text-sm mb-2 text-gray-800">Interactive Exploration</h4>
                    <p className="text-xs text-gray-600">Navigate through the monument using 360° panoramic views</p>
                  </div>
                  <div className="bg-[#FFF8DC] p-4 rounded-xl">
                    <h4 className="text-sm mb-2 text-gray-800">Historical Insights</h4>
                    <p className="text-xs text-gray-600">Learn about architecture and history with audio commentary</p>
                  </div>
                  <div className="bg-[#FFF8DC] p-4 rounded-xl">
                    <h4 className="text-sm mb-2 text-gray-800">High Resolution</h4>
                    <p className="text-xs text-gray-600">Experience every detail with ultra HD panoramic images</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  <strong>Note:</strong> Experience an immersive 10-second virtual tour preview of {currentSite.name}.
                  This quick tour showcases the heritage site's key architectural features and cultural significance. 
                  For a complete 360° interactive experience, book your visit today!
                </p>

                <div className="flex gap-3">
                  <RippleButton
                    onClick={() => setShowVirtualTour(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Close
                  </RippleButton>
                  <RippleButton
                    onClick={() => {
                      setShowVirtualTour(false);
                      onNavigate('booking', undefined, undefined, currentSite);
                    }}
                    variant="primary"
                    className="flex-1"
                  >
                    Book a Visit
                  </RippleButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}