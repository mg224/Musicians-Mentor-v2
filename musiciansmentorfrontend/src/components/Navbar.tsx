import React, { useState } from "react"
import { Music, Bell, Settings, LogOut, User, MessageCircle, Search } from 'lucide-react'

interface NavbarProps {
  userName: string
  userRole: string
  userAvatar: string
}

export default function Navbar({ userName, userRole, userAvatar }: NavbarProps) {

  const [activeTab, setActiveTab] = useState('overview')
  const [notifications, setNotifications] = useState(3)

  return (
    <nav className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-50 animate-pulse"></div>
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Music className="w-8 h-8 animate-spin" style={{animationDuration: '3s'}} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Musician's Mentor
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'overview' 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'messages' 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'hover:bg-white hover:text-purple-600'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Messages</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-all duration-300">
              <Search className="w-4 h-4" />
              <span>Find Musicians</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-3">
              <img 
                src={userAvatar} 
                alt={userName}
                className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
              />
              <div className="hidden sm:block">
                <p className="font-semibold">{userName}</p>
                <p className="text-xs opacity-80">{userRole}</p>
              </div>
            </div>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}