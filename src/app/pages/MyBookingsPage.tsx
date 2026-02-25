import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { ArrowLeft, Calendar, MapPin, Users, IndianRupee, Trash2 } from 'lucide-react';
import { Booking } from '../App';

interface MyBookingsPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  userName: string;
  bookings: Booking[];
  onCancelBooking: (id: number) => void;
  onLogout: () => void;
}

export function MyBookingsPage({ onNavigate, userName, bookings, onCancelBooking, onLogout }: MyBookingsPageProps) {
  const activeBookings = bookings.filter(b => b.status === 'booked');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="my-bookings" isLoggedIn userName={userName} onLogout={onLogout} />
      
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
            <h1 className="text-gray-800">My Bookings</h1>
            <p className="text-gray-600 mt-1">Manage your heritage site visits</p>
          </div>
        </div>

        {/* Active Bookings */}
        <div className="mb-12">
          <h2 className="mb-6 text-gray-800 flex items-center gap-2">
            <Calendar className="text-[#FF9933]" />
            Upcoming Visits ({activeBookings.length})
          </h2>

          {activeBookings.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="mb-2 text-gray-800">No Upcoming Bookings</h3>
              <p className="text-gray-600 mb-6">
                Start exploring India's heritage sites and book your next visit!
              </p>
              <RippleButton 
                onClick={() => onNavigate('browse-states')} 
                variant="primary"
              >
                Browse Heritage Sites
              </RippleButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 aspect-video md:aspect-auto">
                      <img
                        src={booking.image}
                        alt={booking.site}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="mb-1 text-gray-800">{booking.site}</h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </p>
                        </div>
                        <span className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm">
                          Confirmed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-[#FF9933]" />
                          <div>
                            <div className="text-xs text-gray-500">Date</div>
                            <div className="text-sm">
                              {new Date(booking.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5 text-[#FF9933]" />
                          <div>
                            <div className="text-xs text-gray-500">Visitors</div>
                            <div className="text-sm">{booking.visitors} {booking.visitors === 1 ? 'Person' : 'People'}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <IndianRupee className="w-5 h-5 text-[#FF9933]" />
                          <div>
                            <div className="text-xs text-gray-500">Total Paid</div>
                            <div className="text-sm flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              {booking.amount}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <RippleButton
                          onClick={() => onNavigate('site-detail')}
                          variant="outline"
                          className="flex-1"
                        >
                          View Details
                        </RippleButton>
                        <button
                          onClick={() => onCancelBooking(booking.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cancelled Bookings */}
        {cancelledBookings.length > 0 && (
          <div>
            <h2 className="mb-6 text-gray-800">
              Cancelled Bookings ({cancelledBookings.length})
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {cancelledBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden opacity-60"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-64 aspect-video md:aspect-auto">
                      <img
                        src={booking.image}
                        alt={booking.site}
                        className="w-full h-full object-cover grayscale"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                        <div>
                          <h3 className="mb-1 text-gray-800">{booking.site}</h3>
                          <p className="text-gray-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {booking.location}
                          </p>
                        </div>
                        <span className="mt-2 md:mt-0 inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm">
                          Cancelled
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Date</div>
                            <div className="text-sm">
                              {new Date(booking.date).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <Users className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Visitors</div>
                            <div className="text-sm">{booking.visitors} {booking.visitors === 1 ? 'Person' : 'People'}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600">
                          <IndianRupee className="w-5 h-5 text-gray-400" />
                          <div>
                            <div className="text-xs text-gray-500">Refunded</div>
                            <div className="text-sm flex items-center">
                              <IndianRupee className="w-4 h-4" />
                              {booking.amount}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}