import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { ArrowLeft, Calendar, Users, CheckCircle, IndianRupee } from 'lucide-react';
import { HeritageSite, HERITAGE_SITES_BY_STATE } from '../data/heritageSites';
import { Booking } from '../App';

interface BookingPageProps {
  onNavigate: (page: string, state?: string, siteId?: string, site?: HeritageSite) => void;
  userName: string;
  selectedSite: HeritageSite | null;
  onAddBooking: (booking: Booking) => void;
  onLogout: () => void;
}

export function BookingPage({ onNavigate, userName, selectedSite, onAddBooking, onLogout }: BookingPageProps) {
  const [date, setDate] = useState('');
  const [visitors, setVisitors] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // Default to Taj Mahal if no site is selected
  const site = selectedSite || HERITAGE_SITES_BY_STATE['Uttar Pradesh'][0];
  
  // Parse entry fee (remove ₹ and commas, handle "Free")
  const getEntryFee = (feeString: string): number => {
    if (feeString.toLowerCase() === 'free') return 0;
    return parseInt(feeString.replace(/[₹,]/g, '')) || 0;
  };

  const entryFee = getEntryFee(site.entryFee.indian);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const booking: Booking = {
      id: Date.now(),
      site: site.name,
      location: `${site.location}, ${site.state}`,
      date: date,
      visitors: visitors,
      amount: visitors * entryFee,
      status: 'booked',
      image: site.image,
      state: site.state,
      siteId: site.id
    };
    onAddBooking(booking);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
        <Navbar onNavigate={onNavigate} currentPage="booking" isLoggedIn userName={userName} onLogout={onLogout} />
        
        <div className="flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#FF9933] to-[#138808] flex items-center justify-center animate-in zoom-in duration-500">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="mb-4 text-gray-800">Booking Confirmed! 🎉</h2>
              
              <div className="bg-gradient-to-r from-[#FFF8DC] to-white p-6 rounded-2xl mb-6">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Site:</span>
                    <span className="text-gray-800">{site.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-800">{new Date(date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visitors:</span>
                    <span className="text-gray-800">{visitors} {visitors === 1 ? 'Person' : 'People'}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-200">
                    <span className="text-gray-800">Total Amount:</span>
                    <span className="text-gray-800 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {visitors * entryFee}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                A confirmation email has been sent to your registered email address. 
                Please carry a valid ID proof for entry.
              </p>

              <div className="space-y-3">
                <RippleButton 
                  onClick={() => onNavigate('my-bookings')} 
                  variant="primary"
                  className="w-full"
                >
                  View My Bookings
                </RippleButton>
                
                <RippleButton 
                  onClick={() => onNavigate('dashboard')} 
                  variant="outline"
                  className="w-full"
                >
                  Back to Dashboard
                </RippleButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = visitors * entryFee;
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="booking" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => onNavigate('site-detail')}
          className="flex items-center gap-2 mb-6 text-[#FF9933] hover:text-[#FF7700] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Site Details
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#FF9933] to-[#138808] p-8 text-white">
                <h2 className="mb-2">Book Your Tour</h2>
                <p className="text-white/90">{site.name}, {site.state}</p>
              </div>

              {/* Form */}
              <form onSubmit={handleBooking} className="p-8 space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">
                    <Calendar className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={minDate}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors"
                    required
                  />
                  {site.closedOn !== 'None' && (
                    <p className="text-sm text-gray-500 mt-2">
                      Note: The site is closed on {site.closedOn}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    <Users className="inline w-5 h-5 mr-2 text-[#FF9933]" />
                    Number of Visitors
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setVisitors(Math.max(1, visitors - 1))}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-xl"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={visitors}
                      onChange={(e) => setVisitors(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      max="20"
                      className="w-24 px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#FF9933] focus:outline-none transition-colors text-center"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setVisitors(Math.min(20, visitors + 1))}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center text-xl"
                    >
                      +
                    </button>
                    <span className="text-gray-600">
                      {visitors === 1 ? 'person' : 'people'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum 20 visitors per booking
                  </p>
                </div>

                {/* Price Breakdown */}
                <div className="bg-gradient-to-r from-[#FFF8DC] to-white p-6 rounded-2xl">
                  <h3 className="mb-4 text-gray-800">Price Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Entry Fee (Indian) × {visitors}</span>
                      <span className="flex items-center">
                        <IndianRupee className="w-4 h-4" />
                        {visitors * entryFee}
                      </span>
                    </div>
                    <div className="border-t border-gray-300 pt-2 flex justify-between">
                      <span className="text-gray-800">Total Amount</span>
                      <span className="text-[#FF9933] flex items-center">
                        <IndianRupee className="w-5 h-5" />
                        {totalAmount}
                      </span>
                    </div>
                  </div>
                </div>

                <RippleButton type="submit" variant="primary" className="w-full">
                  Confirm Booking
                </RippleButton>
              </form>
            </div>
          </div>

          {/* Site Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="mb-2 text-gray-800">{site.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{site.location}, {site.state}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-[#FF9933]" />
                    Open: {site.openingHours}
                  </div>
                  {site.unesco && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-[#FF9933]" />
                      UNESCO World Heritage Site
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-[#FFF8DC] rounded-xl">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> Please arrive 15 minutes before your scheduled time. 
                    Carry a valid photo ID for verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}