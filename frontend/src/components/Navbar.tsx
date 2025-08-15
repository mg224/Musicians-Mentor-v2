import React, { useState } from "react"
import { Music, Settings, LogOut, User, Search } from 'lucide-react'
import api from "../utils/api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

interface NavbarProps {
  userName: string
  userRole: string
  userAvatar: string
}

export default function Navbar({ userName, userRole, userAvatar }: NavbarProps) {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const getSelectedTab = () => {
    const path = location.pathname

    if (path === "/dashboard") {
      return "dashboard"
    }
    else if (path === "/settings"){
      return "settings"
    }
    else if (path.startsWith("/search")){
      return "search"
    }
  }

  const selectedTab = getSelectedTab()

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const refreshToken = sessionStorage.getItem(REFRESH_TOKEN)
        
      if (!refreshToken) {
        throw new Error("No refresh token")
      }

      const res = await api.post("/api/logout/", {
        refresh_token: refreshToken
      })

      if (res.status !== 200) {
        throw new Error("Failed to logout")
      }

      toast.success("Logged out successfully!")

    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        toast.error(`Logout failed: ${error.message}`)
      } else {
        toast.error("An unexpected error occurred during logout")
      }

    } finally {
      sessionStorage.removeItem(ACCESS_TOKEN)
      sessionStorage.removeItem(REFRESH_TOKEN)
      sessionStorage.clear()

      navigate("/")

    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Logging out...</p>
        </div>
      </div>
    )
  }

  return (
    <nav className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg">
      <ToastContainer />
      <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-50 animate-pulse"></div>
      <div className="relative z-10 container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Music className="w-10 h-10 animate-spin" style={{animationDuration: '3s'}} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Musician's Mentor
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                selectedTab === 'dashboard' 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'hover:bg-white hover:bg-opacity-20 hover:text-purple-600'
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-lg">Dashboard</span>
            </Link>
            {userRole === "student" && (
              <Link 
                to="/search"
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  selectedTab === 'search' 
                    ? 'bg-white text-purple-600 shadow-lg' 
                    : 'hover:bg-white hover:bg-opacity-20 hover:text-purple-600'
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="text-lg">Find Teachers</span>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            
            <div className="flex items-center gap-3">
              <img 
                src={userAvatar} 
                alt={userName}
                className="w-12 h-12 rounded-full border-2 border-white shadow-lg object-cover"
              />
              <div className="hidden sm:block">
                <p className="font-semibold text-lg">{userName}</p>
                <p className="text-xs opacity-80">{userRole.toUpperCase()}</p>
              </div>
            </div>
            <Link
              to="/settings"
              className={`p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-300 cursor-pointer ${
                selectedTab === 'settings' 
                  ? 'bg-white text-purple-600 shadow-lg' 
                  : 'hover:bg-white hover:text-purple-600'
              }`}>
              <Settings className="w-5 h-5" />
            </Link>
            <button 
              onClick={handleLogout}
              className="p-2 hover:bg-white hover:text-purple-600 hover:bg-opacity-20 rounded-full transition-all duration-300 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}