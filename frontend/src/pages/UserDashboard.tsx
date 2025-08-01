import React, { useState } from 'react'
import { Music, Bell, Settings, LogOut, User, MessageCircle, Star,  MapPin, Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function UserDashboard() {

  // Mock user data
  const user = {
    name: "John Doe",
    role: "Teacher",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c767?w=150&h=150&fit=crop&crop=face",
    location: "Atlanta, GA",
    joinDate: "January 2025",
    rating: 4.8,
    lessonsCompleted: 24,
    instruments: ["Piano", "Guitar", "Voice"],
    bio: "Passionate musician with 5 years of piano experience and 3 years of guitar. Love helping beginners discover the joy of music!"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
      <Navbar
        userName={user.name}
        userRole={user.role}
        userAvatar={user.avatar}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h1>
              <p className="text-lg text-purple-600 font-medium mb-3">{user.role}</p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Instruments</h3>
                <div className="flex flex-wrap gap-2">
                  {user.instruments.map((instrument, index) => (
                    <span key={index} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                      {instrument}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-gray-600 text-sm">
                <span>Member since: {user.joinDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors">
                <Settings className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-600 leading-relaxed">
            {user.bio}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}