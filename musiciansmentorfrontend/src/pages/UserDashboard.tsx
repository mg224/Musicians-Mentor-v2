import React, { useState } from 'react'
import { Music, Bell, Settings, LogOut, User, MessageCircle, Star,  MapPin, Search } from 'lucide-react'
import Navbar from '../components/Navbar'

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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navbar
        userName={user.name}
        userRole={user.role}
        userAvatar={user.avatar}
      />
      
    </div>
  )
}