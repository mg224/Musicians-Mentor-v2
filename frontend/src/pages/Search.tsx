// import React, { useEffect, useState } from 'react'
// import { ToastContainer } from 'react-toastify'
// import Navbar from '../components/Navbar'
// import api from '../utils/api'
// import type { StudentProfile, TeacherProfile } from '../utils/types'
// import { BookOpen, MapPin, User, DollarSign, Calendar, SearchIcon } from 'lucide-react'
// import { Link } from 'react-router-dom'

// export default function Search() {
//   const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
//   const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null)
//   const [teachers, setTeachers] = useState<TeacherProfile[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   const [searchError, setSearchError] = useState("")
//   const [hasSearched, setHasSearched] = useState(false)
//   const [searchParams, setSearchParams] = useState({
//     instrument: "",
//     location: "",
//     bio: "",
//     rate_min: "",
//     rate_max: "",
//     years_experience_min: "",
//     years_experience_max: ""
//   })

//   const activeProfile = studentProfile || teacherProfile

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         setLoading(true)

//         const res = await api.get("/api/me/profile/")
//         if (res.status !== 200) {
//           throw new Error('Failed to fetch user profile')
//         }

//         const userData = res.data

//         if (userData.user.role === "student") {
//           setStudentProfile(userData)
//         } else if (userData.user.role === "teacher") {
//           setTeacherProfile(userData)
//         }

//       } catch (error) {
//         console.log(error)

//         if (error instanceof Error) {
//           setError(error.message)
//         } else {
//           setError("Failed to load user profile.")
//         }

//       } finally {
//         setLoading(false)

//       }
//     }

//     fetchUserProfile()
//   }, [])

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setSearchParams(prev => ({...prev, [name]: value}))
//   }

//   const buildQueryString = () => {
//     const params = new URLSearchParams()

//     if (searchParams.instrument.trim()) {
//       params.append("instrument__icontains", searchParams.instrument.trim())
//     }
//     if (searchParams.location.trim()) {
//       params.append("location__icontains", searchParams.location.trim())
//     }
//     if (searchParams.bio.trim()) {
//       params.append("bio__icontains", searchParams.bio.trim())
//     }

//     if (searchParams.years_experience_min.trim()) {
//       params.append("years_experience__gte", searchParams.years_experience_min)
//     }
//     if (searchParams.years_experience_max.trim()) {
//       params.append("years_experience__lte", searchParams.years_experience_max.trim())
//     }

//     return params.toString()
//   }

//   const clearSearch = () => {
//     setSearchParams({
//       instrument: "",
//       location: "",
//       bio: "",
//       rate_min: "",
//       rate_max: "",
//       years_experience_min: "",
//       years_experience_max: ""
//     })
//     // setTeachers([])
//     // setError("")
//     // setHasSearched(false)
//   }

//   const handleSearch = async () => {
//     setLoading(true)
//     setHasSearched(true)

//     try {
//       const queryString = buildQueryString()

//       const res = await api.get(`/api/teachers/search/?${queryString}`)

//       if (res.status !== 200) {
//         throw new Error('Failed to fetch teachers')
//       }

//       const teacherData = res.data
//       setTeachers(teacherData.results)

//     } catch (error) {
//       console.log(error)

//       if (error instanceof Error) {
//         setSearchError(error.message)
//       } else {
//         setSearchError("Failed to load user profile.")
//       }

//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
//           <p className="mt-4 text-gray-600">Loading...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center bg-white rounded-lg p-8 shadow-lg">
//           <p className="text-red-600 mb-4">Error loading profile: {error}</p>
//           <button 
//             onClick={() => window.location.reload()} 
//             className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (!activeProfile) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
//         <div className="text-center bg-white rounded-lg p-8 shadow-lg">
//           <p className="text-gray-600">Invalid user profile</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
//       <ToastContainer />
//       <Navbar
//         userName={`${activeProfile.user.first_name} ${activeProfile.user.last_name}`}
//         userRole={activeProfile.user.role}
//         userAvatar={activeProfile.profile_picture}
//       />

//       <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8 mb-8">
//         <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Teachers</h2>
        
//         {/* Search Form */}
//         <div className="p-6 rounded-lg mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
//             {/* Instrument Search */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <BookOpen className="inline w-4 h-4 mr-1" />
//                 Instrument
//               </label>
//               <input
//                 type="text"
//                 name="instrument"
//                 value={searchParams.instrument}
//                 onChange={handleInputChange}
//                 placeholder="e.g., Piano, Guitar, Violin"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>

//             {/* Location Search */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <MapPin className="inline w-4 h-4 mr-1" />
//                 Location
//               </label>
//               <input
//                 type="text"
//                 name="location"
//                 value={searchParams.location}
//                 onChange={handleInputChange}
//                 placeholder="e.g., New York, Online"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>

//             {/* Bio/Keywords Search */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 <User className="inline w-4 h-4 mr-1" />
//                 Keywords in Bio
//               </label>
//               <input
//                 type="text"
//                 name="bio"
//                 value={searchParams.bio}
//                 onChange={handleInputChange}
//                 placeholder="e.g., jazz, classical, orchestra, band, choir"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Rate Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Min Rate
//               </label>
//               <input
//                 type="number"
//                 name="rate_min"
//                 value={searchParams.rate_min}
//                 onChange={handleInputChange}
//                 placeholder="30"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Max Rate
//               </label>
//               <input
//                 type="number"
//                 name="rate_max"
//                 value={searchParams.rate_max}
//                 onChange={handleInputChange}
//                 placeholder="100"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Experience Filters */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Min Years Experience
//               </label>
//               <input
//                 type="number"
//                 name="years_experience_min"
//                 value={searchParams.years_experience_min}
//                 onChange={handleInputChange}
//                 placeholder="2"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Max Years Experience
//               </label>
//               <input
//                 type="number"
//                 name="years_experience_max"
//                 value={searchParams.years_experience_max}
//                 onChange={handleInputChange}
//                 placeholder="20"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
//               />
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-end">
//             <button
//               onClick={clearSearch}
//               className="px-6 py-3 bg-gray-50 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-center cursor-pointer"
//             >
//               Clear
//             </button>
//             <button
//               onClick={handleSearch}
//               disabled={loading}
//               className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg transition-colors cursor-pointer"
//             >
//               <SearchIcon className="w-5 h-5" />
//               Search
//             </button>
//           </div>
//         </div>
//       </div>

//       {hasSearched && (
//         <div>
//           <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
//             Search Results
//           </h3>

//           {teachers.length === 0 ? (
//             <div className="text-center text-gray-500 py-8">
//               No teachers found matching your criteria. Try adjusting your search parameters.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10 lg:max-w-4/5 mx-auto">
//               {teachers.map(teacher => (
//                 <Link 
//                   to={`/teacherPage/${teacher.id}`} 
//                   key={teacher.id} 
//                   className="bg-white border border-gray-200 hover:bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//                   {teacher.profile_picture && (
//                     <img
//                       src={teacher.profile_picture}
//                       alt={`${teacher.user.first_name} ${teacher.user.last_name}`}
//                       className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
//                     />
//                   )}
//                   <h4 className="text-lg text-purple-600 font-semibold text-center mb-2">
//                     {teacher.user.first_name} {teacher.user.last_name}
//                   </h4>
//                   <div className="space-y-2 text-sm text-gray-600">
//                     <p><span className="font-medium">Instrument:</span> {teacher.instrument}</p>
//                     <p><span className="font-medium">Rate:</span> ${teacher.rate}/hour</p>
//                     <p><span className="font-medium">Location:</span> {teacher.location}</p>
//                     <p><span className="font-medium">Experience:</span> {teacher.years_experience} years</p>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }


import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../utils/api'
import type { StudentProfile, TeacherProfile } from '../utils/types'
import { BookOpen, MapPin, User, DollarSign, Calendar, SearchIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Search() {
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null)
  const [teacherProfile, setTeacherProfile] = useState<TeacherProfile | null>(null)
  const [teachers, setTeachers] = useState<TeacherProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchError, setSearchError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)
  const [searchParams, setSearchParams] = useState({
    instrument: "",
    location: "",
    bio: "",
    rate_min: "",
    rate_max: "",
    years_experience_min: "",
    years_experience_max: ""
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSearchParams(prev => ({...prev, [name]: value}))
  }

  const buildQueryString = () => {
    const params = new URLSearchParams()

    if (searchParams.instrument.trim()) {
      params.append("instrument__icontains", searchParams.instrument.trim())
    }
    if (searchParams.location.trim()) {
      params.append("location__icontains", searchParams.location.trim())
    }
    if (searchParams.bio.trim()) {
      params.append("bio__icontains", searchParams.bio.trim())
    }

    if (searchParams.years_experience_min.trim()) {
      params.append("years_experience__gte", searchParams.years_experience_min)
    }
    if (searchParams.years_experience_max.trim()) {
      params.append("years_experience__lte", searchParams.years_experience_max.trim())
    }

    return params.toString()
  }

  const clearSearch = () => {
    setSearchParams({
      instrument: "",
      location: "",
      bio: "",
      rate_min: "",
      rate_max: "",
      years_experience_min: "",
      years_experience_max: ""
    })
    // setTeachers([])
    // setError("")
    // setHasSearched(false)
  }

  const handleSearch = async () => {
    setLoading(true)
    setHasSearched(true)

    try {
      const queryString = buildQueryString()

      const res = await api.get(`/api/teachers/search/?${queryString}`)

      if (res.status !== 200) {
        throw new Error('Failed to fetch teachers')
      }

      const teacherData = res.data
      setTeachers(teacherData.results)

    } catch (error) {
      console.log(error)

      if (error instanceof Error) {
        setSearchError(error.message)
      } else {
        setSearchError("Failed to load user profile.")
      }

    } finally {
      setLoading(false)
    }
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Find Teachers</h1>
          <p className="text-gray-600">Search through our network of talented music teachers to find your perfect match.</p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <SearchIcon className="w-6 h-6" />
            Search Filters
          </h2>
          
          <div className="space-y-6">
            {/* Basic Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Instrument Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <BookOpen className="inline w-4 h-4 mr-1" />
                  Instrument
                </label>
                <input
                  type="text"
                  name="instrument"
                  value={searchParams.instrument}
                  onChange={handleInputChange}
                  placeholder="e.g., Piano, Guitar, Violin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Location Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline w-4 h-4 mr-1" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="e.g., New York, Online"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Bio/Keywords Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline w-4 h-4 mr-1" />
                  Keywords in Bio
                </label>
                <input
                  type="text"
                  name="bio"
                  value={searchParams.bio}
                  onChange={handleInputChange}
                  placeholder="e.g., jazz, classical, orchestra"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Rate Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Rate Range (per hour)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rate ($)
                  </label>
                  <input
                    type="number"
                    name="rate_min"
                    value={searchParams.rate_min}
                    onChange={handleInputChange}
                    placeholder="30"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Rate ($)
                  </label>
                  <input
                    type="number"
                    name="rate_max"
                    value={searchParams.rate_max}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Experience Filters */}
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Years of Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Years
                  </label>
                  <input
                    type="number"
                    name="years_experience_min"
                    value={searchParams.years_experience_min}
                    onChange={handleInputChange}
                    placeholder="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Years
                  </label>
                  <input
                    type="number"
                    name="years_experience_max"
                    value={searchParams.years_experience_max}
                    onChange={handleInputChange}
                    placeholder="20"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
              <button
                onClick={clearSearch}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear Filters
              </button>
              <button
                onClick={handleSearch}
                disabled={loading}
                className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <SearchIcon className="w-5 h-5" />
                Search Teachers
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {hasSearched && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Search Results
              {teachers.length > 0 && (
                <span className="text-lg font-normal text-gray-600 ml-2">
                  ({teachers.length} teacher{teachers.length !== 1 ? 's' : ''} found)
                </span>
              )}
            </h2>

            {searchError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">Error: {searchError}</p>
              </div>
            )}

            {teachers.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <SearchIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No teachers found</h3>
                <p className="text-gray-500">Try adjusting your search filters to find more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {teachers.map(teacher => (
                  <Link 
                    to={`/teacherPage/${teacher.id}`} 
                    key={teacher.id} 
                    className="group bg-gray-50 border border-gray-200 hover:bg-white hover:border-purple-200 rounded-2xl shadow-sm hover:shadow-lg p-6 transition-all duration-300"
                  >
                    {/* Profile Picture */}
                    <div className="flex justify-center mb-4">
                      {teacher.profile_picture ? (
                        <img
                          src={teacher.profile_picture}
                          alt={`${teacher.user.first_name} ${teacher.user.last_name}`}
                          className="w-20 h-20 rounded-full object-cover border-4 border-purple-100 group-hover:border-purple-200 transition-colors"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-purple-100 group-hover:bg-purple-200 border-4 border-purple-100 group-hover:border-purple-200 transition-colors flex items-center justify-center">
                          <span className="text-purple-600 font-semibold text-lg">
                            {teacher.user.first_name?.[0]}{teacher.user.last_name?.[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Name */}
                    <h4 className="text-lg font-semibold text-center mb-4 text-purple-600 group-hover:text-purple-700 transition-colors">
                      {teacher.user.first_name} {teacher.user.last_name}
                    </h4>

                    {/* Details */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 mt-0.5 text-purple-400" />
                        <div>
                          <p className="text-gray-700"><span className="font-medium">Instrument:</span> {teacher.instrument || "Not specified"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <DollarSign className="w-4 h-4 mt-0.5 text-green-400" />
                        <div>
                          <p className="text-gray-700"><span className="font-medium">Rate:</span> ${teacher.rate || "N/A"}/hour</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-blue-400" />
                        <div>
                          <p className="text-gray-700"><span className="font-medium">Location:</span> {teacher.location || "Not specified"}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 mt-0.5 text-orange-400" />
                        <div>
                          <p className="text-gray-700"><span className="font-medium">Experience: </span>{teacher.years_experience || "N/A"} years</p>
                        </div>
                      </div>
                    </div>

                    {/* View Profile Button */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-center text-purple-600 group-hover:text-purple-700 font-medium text-sm">
                        View Full Profile →
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}