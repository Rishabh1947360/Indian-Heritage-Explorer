import React, { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { BrowseStatesPage } from './pages/BrowseStatesPage';
import { SiteDetailPage } from './pages/SiteDetailPage';
import { BookingPage } from './pages/BookingPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ArtisansPage } from './pages/ArtisansPage';
import { ArtisanRegistrationPage, ArtisanFormData } from './pages/ArtisanRegistrationPage';
import { HeritageSite } from './data/heritageSites';

type Page = 
  | 'landing' 
  | 'login' 
  | 'signup' 
  | 'dashboard' 
  | 'browse-states' 
  | 'site-detail' 
  | 'booking' 
  | 'my-bookings' 
  | 'artisans'
  | 'artisan-registration';

export interface Artisan {
  id: number;
  name: string;
  craft: string;
  state: string;
  location: string;
  experience: string;
  phone: string;
  email: string;
  image: string;
  specialty: string;
}

export interface Booking {
  id: number;
  site: string;
  location: string;
  date: string;
  visitors: number;
  amount: number;
  status: 'booked' | 'cancelled';
  image: string;
  state: string;
  siteId: string;
}

export interface User {
  email: string;
  password: string;
  name: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedSiteId, setSelectedSiteId] = useState<string>('');
  const [selectedSite, setSelectedSite] = useState<HeritageSite | null>(null);
  const [registeredArtisans, setRegisteredArtisans] = useState<Artisan[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);

  // Load data from localStorage on mount
  React.useEffect(() => {
    const savedUsers = localStorage.getItem('registeredUsers');
    const savedCurrentUser = localStorage.getItem('currentUser');
    const savedBookings = localStorage.getItem('bookings');
    const savedArtisans = localStorage.getItem('registeredArtisans');

    if (savedUsers) {
      setRegisteredUsers(JSON.parse(savedUsers));
    }

    if (savedCurrentUser) {
      const user = JSON.parse(savedCurrentUser);
      setUserName(user.name);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
    }

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }

    if (savedArtisans) {
      setRegisteredArtisans(JSON.parse(savedArtisans));
    }
  }, []);

  // Save registered users to localStorage whenever they change
  React.useEffect(() => {
    if (registeredUsers.length > 0) {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    }
  }, [registeredUsers]);

  // Save bookings to localStorage whenever they change
  React.useEffect(() => {
    if (bookings.length > 0) {
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }
  }, [bookings]);

  // Save artisans to localStorage whenever they change
  React.useEffect(() => {
    if (registeredArtisans.length > 0) {
      localStorage.setItem('registeredArtisans', JSON.stringify(registeredArtisans));
    }
  }, [registeredArtisans]);

  const handleNavigate = (page: string, state?: string, siteId?: string, site?: HeritageSite) => {
    setCurrentPage(page as Page);
    if (state) setSelectedState(state);
    if (siteId) setSelectedSiteId(siteId);
    if (site) setSelectedSite(site);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogin = (name: string) => {
    setUserName(name);
    setIsLoggedIn(true);
    // Save current user to localStorage
    const currentUser = registeredUsers.find(u => u.name === name);
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('landing');
    // Clear current user from localStorage
    localStorage.removeItem('currentUser');
  };

  const handleArtisanRegistration = (formData: ArtisanFormData) => {
    const newArtisan: Artisan = {
      id: Date.now(),
      ...formData,
      image: 'https://images.unsplash.com/photo-1650726583448-dda0065f2f11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBhcnRpc2FuJTIwY3JhZnQlMjB3b3JrZXJ8ZW58MXx8fHwxNzcxODY3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    };
    setRegisteredArtisans(prev => [...prev, newArtisan]);
  };

  const handleAddBooking = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const handleCancelBooking = (id: number) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id 
        ? { ...booking, status: 'cancelled' as const }
        : booking
    ));
  };

  // Render the appropriate page based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} registeredUsers={registeredUsers} />;
      
      case 'signup':
        return <SignupPage onNavigate={handleNavigate} onSignup={(user) => setRegisteredUsers(prev => [...prev, user])} registeredUsers={registeredUsers} />;
      
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} userName={userName} onLogout={handleLogout} />;
      
      case 'browse-states':
        return <BrowseStatesPage onNavigate={handleNavigate} userName={userName} onLogout={handleLogout} />;
      
      case 'site-detail':
        return <SiteDetailPage onNavigate={handleNavigate} userName={userName} selectedState={selectedState} selectedSiteId={selectedSiteId} selectedSite={selectedSite} onLogout={handleLogout} />;
      
      case 'booking':
        return <BookingPage onNavigate={handleNavigate} userName={userName} selectedSite={selectedSite} onAddBooking={handleAddBooking} onLogout={handleLogout} />;
      
      case 'my-bookings':
        return <MyBookingsPage onNavigate={handleNavigate} userName={userName} bookings={bookings} onCancelBooking={handleCancelBooking} onLogout={handleLogout} />;
      
      case 'artisans':
        return <ArtisansPage onNavigate={handleNavigate} userName={userName} registeredArtisans={registeredArtisans} onLogout={handleLogout} />;
      
      case 'artisan-registration':
        return <ArtisanRegistrationPage onNavigate={handleNavigate} userName={userName} onRegister={handleArtisanRegistration} onLogout={handleLogout} />;
      
      default:
        return <LandingPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderPage()}
    </div>
  );
}