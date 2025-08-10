import React, { useEffect, useState } from 'react'
import { Save, Upload, ArrowLeft, User, MapPin, Music, DollarSign, Calendar, FileText } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { type StudentProfile, type TeacherProfile } from '../utils/types'
import api from '../utils/api'
import { toast, ToastContainer } from "react-toastify"

export default function Settings() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    user: {
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      role: ""
    },
    location: "",
    instrument: "",
    bio: "",
    profile_picture: "",
    // Student specific
    grade_level: "",
    // Teacher specific
    years_experience: "",
    rate: ""
  })
    
  const navigate = useNavigate()
  const activeProfile = studentProfile || teacherProfile

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true)
        setError(null)

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

        // Pre-populate form
        setFormData({
          user: {
            first_name: userData.user.first_name || "",
            last_name: userData.user.last_name || "",
            email: userData.user.email || "",
            username: userData.user.username || "",
            role: userData.user.role || ""
          },
          location: userData.location || "",
          instrument: userData.instrument || "",
          bio: userData.bio || "",
          profile_picture: userData.profile_picture || "",
          grade_level: userData.grade_level || "",
          years_experience: userData.years_experience || "",
          rate: userData.rate || ""
        })

        if (userData.profile_picture) {
          setPreviewImage(userData.profile_picture)
        }

      } catch (error) {
        console.error('Profile fetch error:', error)
        
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({...prev, [name]: value}))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be smaller than 5MB')
        return
      }

      setSelectedImage(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        const dataUrl = reader.result as string
        setPreviewImage(dataUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setSaving(true)

      const sendingData = new FormData()

      if (selectedImage) {
        sendingData.append("profile_picture", selectedImage)
      }

      sendingData.append("location", formData.location)
      sendingData.append("instrument", formData.instrument)
      sendingData.append("bio", formData.bio)

      if (studentProfile && formData.grade_level) {
      sendingData.append("grade_level", formData.grade_level)
      } else if (teacherProfile) {
        if (formData.years_experience) {
          sendingData.append("years_experience", formData.years_experience)
        }
        if (formData.rate) {
          sendingData.append("rate", formData.rate)
        }
      }

      const res = await api.put("/api/me/profile/", sendingData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      })

      if (res.status !== 200) {
        throw new Error("Failed to update user profile")
      }

      toast.success("Profile updated successfully")
      navigate("/dashboard")

    } catch (error) {
      console.error(error)
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("Failed to update profile")
      }
      
    } finally {
      setSaving(false)
    }
    
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Loading settings...</p>
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

  if (saving) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-600">Saving...</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <ToastContainer />
      <Navbar
        userName={`${activeProfile.user.first_name} ${activeProfile.user.last_name}`}
        userRole={activeProfile.user.role}
        userAvatar={activeProfile.profile_picture}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600 mt-2">Update your profile information and preferences.</p>
          {studentProfile && (
            <p className="text-gray-600 mt-2 text-xs">Feel free to fill in as many fields as you'd like, as they're all optional. However, if you do choose to fill out at least your basic information, we can provide some teacher recommendations.</p>
          )}
          {teacherProfile && (
            <p className="text-gray-600 mt-2 text-xs">We highly recommend teachers fill out all fields to increase the chances of connecting with students!</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Picture Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <img 
                  src={previewImage || activeProfile.profile_picture || '/default-avatar.png'} 
                  alt="Profile preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700 mb-2">
                  Change Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <label 
                    htmlFor="profile_picture"
                    className="cursor-pointer bg-purple-500 hover:bg-purple-600 transition-colors text-white flex items-center gap-2 rounded-lg px-4 py-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload New Picture
                  </label>
                  <input 
                    type="file"
                    id="profile_picture"
                    name="profile_picture"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageChange}
                    hidden
                  />
                  <p className="text-sm text-gray-500">JPG, JPEG, PNG (max 5 MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.user.first_name}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.user.last_name}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.user.username}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.user.email}
                  onChange={handleInputChange}
                  required
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="City, State"
                />
              </div>
              
              <div>
                <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Instrument
                </label>
                <input
                  type="text"
                  id="instrument"
                  name="instrument"
                  value={formData.instrument}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Violin, Trumpet, Cello, etc."
                />
              </div>
            </div>
          </div>

          {/* Role-specific Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                Additional Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Student Grade Level */}
                {studentProfile && (
                  <div>
                    <label htmlFor="grade_level" className="block text-sm font-medium text-gray-700 mb-2">
                      Grade Level
                    </label>
                    <select
                      id="grade_level"
                      name="grade_level"
                      value={formData.grade_level}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="">Select grade level</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(grade => (
                        <option key={grade} value={grade.toString()}>{grade}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Teacher YOE */}
                {teacherProfile && (
                  <div>
                    <label htmlFor="years_experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      id="years_experience"
                      name="years_experience"
                      value={formData.years_experience}
                      onChange={handleInputChange}
                      min="0"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Years of Experience Playing/Teaching"
                    />
                  </div>
                )}

                {/* Teacher Rate */}
                {teacherProfile && (
                  <div>
                    <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-2">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      id="rate"
                      name="rate"
                      value={formData.rate}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g. 25.00"
                    />
                  </div>
                )}
              </div>
              
              {/* Bio */}
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder={
                    studentProfile 
                      ? "Tell us about your musical journey, goals, and what you hope to achieve."
                      : "Share your teaching philosophy, musical experience, and what makes you passionate about music education. Feel free to include anything you might feel would be useful for potential students to know about you."
                  }
                />
              </div>
            </div>

          <p className="text-sm text-gray-500 mt-2"><b>Disclaimer:</b> Information you provide in your profile may be publicly accessible on the internet. See <Link to="/terms" className="underline">Terms and Conditions</Link> for more info.</p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link
              to="/dashboard"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}