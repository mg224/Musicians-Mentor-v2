import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import api from '../utils/api'
import type { StudentProfile, TeacherProfile } from '../utils/types'

export default function Search() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const activeProfile = studentProfile || teacherProfile

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)

        const res = await api.get("/api/me/profile/")
        if (res.status !== 200) {
          throw new Error('Failed to fetch user profile')
        }

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
  }, [])

  // Mock user data
  const exampleStudent = {
    user: {
      first_name: "Jane",
      last_name: "Doe",
      email: "janedoe@gmail.com",
      username: "janedoe1",
      role: "student"
    },
    location: "Atlanta, GA",
    instrument: "Guitar",
    grade_level: 6,
    bio: "Beginner musician who wants to improve as an amateur guitar player.",
    profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b332c767?w=150&h=150&fit=crop&crop=face",
  }

  const exampleTeacher = {
    user: {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      username: "johndoe1",
      role: "teacher"
    },
    location: "Atlanta, GA",
    instrument: "Piano",
    years_experience: 5,
    bio: "Passionate musician with 5 years of piano experience and 3 years of guitar. Love helping beginners discover the joy of music!",
    rate: 20.00,
    profile_picture: "https://images.unsplash.com/photo-1494790108755-2616b332c767?w=150&h=150&fit=crop&crop=face",
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
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
          <p className="text-gray-600">Invalid user profile</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <ToastContainer />
      <Navbar
        userName={`${activeProfile.user.first_name} ${activeProfile.user.last_name}`}
        userRole={activeProfile.user.role}
        userAvatar={activeProfile.profile_picture}
      />

      Search!
    </div>
  )
}
