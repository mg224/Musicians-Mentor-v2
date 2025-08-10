import React, { act, useEffect, useState } from 'react'
import { Music, Bell, Settings, LogOut, User,  MapPin, Award, Clock, DollarSign, GraduationCap, CircleAlert, Mail } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { type StudentProfile, type TeacherProfile } from '../utils/types'
import api from '../utils/api'
import { Link } from 'react-router-dom'

export default function UserDashboard() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeProfile = studentProfile || teacherProfile

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log('📡 Fetching user profile from Dashboard')
        setLoading(true)
        setError(null)

        const res = await api.get("/api/me/profile/")
        if (res.status !== 200) {
          throw new Error('Failed to fetch user profile')
        }
        
        console.log('✅ Dashboard profile fetch successful')


        const userData = res.data

        if (userData.user.role === "student") {
          setStudentProfile(userData)
        } else if (userData.user.role === "teacher") {
          setTeacherProfile(userData)
        }

      } catch (error) {
        console.log(error)

        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError("Failed to load user profile.")
        }

      } finally {
        setLoading(false)

      }
    }

    fetchUserProfile()

    return () => {
      console.log('🧹 UserDashboard component unmounting')
    }
  }, [])

  // Mock user data
  // const exampleStudent = {
  //   user: {
  //     first_name: "Jane",
  //     last_name: "Doe",
  //     email: "janedoe@gmail.com",
  //     username: "janedoe1",
  //     role: "student"
  //   },
  //   location: "Atlanta, GA",
  //   instrument: "Guitar",
  //   grade_level: 6,
  //   bio: "Beginner musician who wants to improve as an amateur guitar player.",
  //   profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b332c767?w=150&h=150&fit=crop&crop=face",
  // }

  // const exampleTeacher = {
  //   user: {
  //     first_name: "John",
  //     last_name: "Doe",
  //     email: "johndoe@gmail.com",
  //     username: "johndoe1",
  //     role: "teacher"
  //   },
  //   location: "Atlanta, GA",
  //   instrument: "Piano",
  //   years_experience: 5,
  //   bio: "Passionate musician with 5 years of piano experience and 3 years of guitar. Love helping beginners discover the joy of music!",
  //   rate: 20.00,
  //   profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b332c767?w=150&h=150&fit=crop&crop=face",
  // }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <p className="text-red-600 mb-4">Error loading profile: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!activeProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    )
  }

  const hasEmptyFields = Object.values(activeProfile).includes(null) || Object.values(activeProfile).includes("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 overflow-hidden">
      <Navbar
        userName={`${activeProfile.user.first_name} ${activeProfile.user.last_name}`}
        userRole={activeProfile.user.role}
        userAvatar={activeProfile.profile_picture}
      />

      <div className="container mx-auto px-4 py-8">
        {hasEmptyFields && (
          <div className="bg-pink-200 text-pink-800 border border-pink-300 rounded-2xl text-sm px-3 py-2 mb-4 flex gap-2 justify-center items-center">
            <CircleAlert className="w-6 h-6" />
            {teacherProfile && (
              <p>Complete your profile to increase your credibility and chances of connecting with students!</p>
            )}
            {studentProfile && (
              <p>Complete your profile if you'd like us to suggest some teachers who might meet your criteria! (Feature coming soon!)</p>
            )}
          </div>
        )}

        {/* Profile Header */}
        {teacherProfile && (
          <div className="bg-purple-200 text-purple-800 border border-purple-300 rounded-2xl px-6 py-4 mb-4 flex gap-2 justify-center items-start font-bold">
            This is what other users will see when they view your profile!
          </div>
        )}
        
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
            {/* Profile Picture */}
            <div className="relative">
              <img 
                src={activeProfile.profile_picture} 
                alt={`${activeProfile.user.first_name} ${activeProfile.user.last_name}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {activeProfile.user.first_name} {activeProfile.user.last_name}
              </h1>
              <p className="text-lg text-purple-600 font-medium mb-3 capitalize">
                {activeProfile.user.role}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>{activeProfile.user.email || "N/A"}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{activeProfile.location || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Link
                to="/settings"
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
                <Settings className="w-4 h-4" />
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Profile Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Instrument */}
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mr-4">
                  <Music className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Instrument</h3>
                  <p className="text-lg font-medium text-gray-800">{activeProfile.instrument || "N/A"}</p>
                </div>
              </div>
            </div>

            {/* Student-specific: Grade Level */}
            {studentProfile && (
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mr-4">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Grade Level</h3>
                    <p className="text-lg font-medium text-gray-800">{studentProfile.grade_level || "N/A"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Teacher-specific: Experience */}
            {teacherProfile && (
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mr-4">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Experience</h3>
                    <p className="text-lg font-medium text-gray-800">{teacherProfile.years_experience || "N/A"} years</p>
                  </div>
                </div>
              </div>
            )}

            {/* Teacher-specific: Rate */}
            {teacherProfile && (
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-100 rounded-full mr-4">
                    <DollarSign className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Rate</h3>
                    <p className="text-lg font-medium text-gray-800">${teacherProfile.rate || "N/A"}/hour</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-600 leading-relaxed">
            {activeProfile.bio || 'No bio provided yet.'}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}