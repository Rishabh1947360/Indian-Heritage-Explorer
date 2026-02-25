import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { RippleButton } from '../components/RippleButton';
import { ArrowLeft, Upload } from 'lucide-react';

interface ArtisanRegistrationPageProps {
  onNavigate: (page: string, state?: string, siteId?: string) => void;
  userName: string;
  onRegister: (artisan: ArtisanFormData) => void;
  onLogout: () => void;
}

export interface ArtisanFormData {
  name: string;
  craft: string;
  state: string;
  location: string;
  experience: string;
  phone: string;
  email: string;
  specialty: string;
}

const INDIAN_STATES = [
  'Uttar Pradesh',
  'Karnataka',
  'Delhi',
  'Rajasthan',
  'Maharashtra',
  'Kerala',
  'Tamil Nadu',
  'Gujarat',
];

const CRAFT_TYPES = [
  'Traditional Pottery',
  'Handloom Weaving',
  'Metal Craftsmanship',
  'Miniature Painting',
  'Wood Carving',
  'Textile Embroidery',
  'Stone Carving',
  'Leather Craft',
  'Jewelry Making',
  'Basket Weaving',
  'Other',
];

export function ArtisanRegistrationPage({ onNavigate, userName, onRegister, onLogout }: ArtisanRegistrationPageProps) {
  const [formData, setFormData] = useState<ArtisanFormData>({
    name: '',
    craft: '',
    state: '',
    location: '',
    experience: '',
    phone: '',
    email: '',
    specialty: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ArtisanFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: keyof ArtisanFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ArtisanFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.craft) newErrors.craft = 'Please select a craft';
    if (!formData.state) newErrors.state = 'Please select a state';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[+]?[0-9\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.specialty.trim()) newErrors.specialty = 'Please describe your specialty';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onRegister(formData);
      setSubmitted(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        onNavigate('artisans');
      }, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
        <Navbar onNavigate={onNavigate} currentPage="artisans" isLoggedIn userName={userName} onLogout={onLogout} />
        
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mb-4 text-gray-800">Registration Successful!</h2>
            <p className="text-gray-600 mb-2">
              Thank you for registering as an artisan, <strong>{formData.name}</strong>!
            </p>
            <p className="text-gray-600">
              Your profile will be reviewed and activated shortly. You will be redirected to the artisans page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8DC] via-white to-[#FFF8DC]">
      <Navbar onNavigate={onNavigate} currentPage="artisans" isLoggedIn userName={userName} onLogout={onLogout} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => onNavigate('artisans')}
            className="p-2 rounded-full hover:bg-white/80 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#FF9933]" />
          </button>
          <div>
            <h1 className="text-gray-800">Register as Artisan</h1>
            <p className="text-gray-600 mt-1">Join our community of traditional craftspeople</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Craft Type */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Craft Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.craft}
                onChange={(e) => handleChange('craft', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.craft ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
              >
                <option value="">Select craft type</option>
                {CRAFT_TYPES.map((craft) => (
                  <option key={craft} value={craft}>{craft}</option>
                ))}
              </select>
              {errors.craft && <p className="text-red-500 text-sm mt-1">{errors.craft}</p>}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.state}
                onChange={(e) => handleChange('state', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.state ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
              >
                <option value="">Select state</option>
                {INDIAN_STATES.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
            </div>

            {/* Location/City */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                City/Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange('location', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
                placeholder="Enter your city"
              />
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Years of Experience <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.experience}
                onChange={(e) => handleChange('experience', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.experience ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
                placeholder="e.g., 15 years"
              />
              {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all`}
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Specialty */}
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-700 mb-2">
                Specialty / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.specialty}
                onChange={(e) => handleChange('specialty', e.target.value)}
                rows={4}
                className={`w-full px-4 py-3 border ${errors.specialty ? 'border-red-500' : 'border-gray-300'} rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF9933] transition-all resize-none`}
                placeholder="Describe your craft specialty, techniques, and what makes your work unique..."
              />
              {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
              <p className="text-sm text-gray-500 mt-1">
                {formData.specialty.length}/500 characters
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8 flex gap-4">
            <RippleButton
              type="submit"
              variant="primary"
              className="flex-1"
            >
              Submit Registration
            </RippleButton>
            <RippleButton
              type="button"
              variant="outline"
              onClick={() => onNavigate('artisans')}
              className="flex-1"
            >
              Cancel
            </RippleButton>
          </div>

          {/* Info */}
          <div className="mt-6 p-4 bg-[#FFF8DC] rounded-xl">
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> By registering, you agree to showcase your traditional crafts 
              on our platform. Your contact information will be visible to heritage enthusiasts 
              and potential customers.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}