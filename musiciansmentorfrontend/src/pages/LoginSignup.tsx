// import React, { useState } from 'react';
// import { Music, Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';
// import { Link } from 'react-router-dom';

// type AuthMode = 'login' | 'signup';

// interface FormData {
//   email: string
//   password: string
//   confirmPassword?: string
//   username?: string
// }

// interface FormErrors {
//   email?: string
//   password?: string
//   confirmPassword?: string
//   username?: string
// }

// interface FormProps {
//   route: string
//   method: "login" | "signup"
// }

// export default function AuthPages({ route, method }: FormProps) {

//   const [authMode, setAuthMode] = useState<AuthMode>(method);
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const handleInputChange = () => {
//   }

//   const validateForm = () => {
    
//   }

//   const handleSubmit = () => {
    
//   }

//   const switchAuthMode = () => {
    
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
//         <div className="absolute bottom-32 left-20 w-28 h-28 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
//         <div className="absolute bottom-20 right-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
//         <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
//         <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-indigo-200 rounded-full opacity-15 animate-bounce"></div>
//       </div>

//       <div className="max-w-md w-full space-y-8 relative z-10">
//         {/* Header */}
//         <div className="text-center">
//           <div className="flex justify-center items-center space-x-3 mb-4">
//             <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
//               <Music className="w-8 h-8 text-white animate-spin" style={{animationDuration: '3s'}} />
//             </div>
//             <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
//               Musician's Mentor
//             </h1>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-900">
//             {authMode === 'login' ? 'Welcome Back!' : 'Join the Community'}
//           </h2>
//         </div>

//         {/* Auth Form */}
//         <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
//           <div className="space-y-6">
//             {/* Full Name - Register Only */}
//             {authMode === 'signup' && (
//               <div className="transform transition-all duration-300 ease-in-out">
//                 <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <User className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="username"
//                     name="username"
//                     type="text"
//                     value={formData.username}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
//                       errors.username ? 'border-red-500 shake' : 'border-gray-300'
//                     }`}
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 {errors.username && (
//                   <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.username}</p>
//                 )}
//               </div>
//             )}

//             {/* Email */}
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
//                     errors.email ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your email"
//                 />
//               </div>
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-gray-400" />
//                 </div>
//                 <input
//                   id="password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleInputChange}
//                   className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
//                     errors.password ? 'border-red-500' : 'border-gray-300'
//                   }`}
//                   placeholder="Enter your password"
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                   )}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.password}</p>
//               )}
//             </div>

//             {/* Confirm Password - Register Only */}
//             {authMode === 'signup' && (
//               <div className="transform transition-all duration-300 ease-in-out">
//                 <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
//                   Confirm Password
//                 </label>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <Lock className="h-5 w-5 text-gray-400" />
//                   </div>
//                   <input
//                     id="confirmPassword"
//                     name="confirmPassword"
//                     type={showConfirmPassword ? "text" : "password"}
//                     value={formData.confirmPassword}
//                     onChange={handleInputChange}
//                     className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
//                       errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
//                     }`}
//                     placeholder="Confirm your password"
//                   />
//                   <button
//                     type="button"
//                     className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   >
//                     {showConfirmPassword ? (
//                       <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     ) : (
//                       <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                     )}
//                   </button>
//                 </div>
//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.confirmPassword}</p>
//                 )}
//               </div>
//             )}

//             {/* Forgot Password - Login Only */}
//             {authMode === 'login' && (
//               <div className="flex items-center justify-center">
//                 <button
//                   type="button"
//                   className="text-sm text-center text-purple-600 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
//                 >
//                   Forgot your password?
//                 </button>
//               </div>
//             )}

//             {/* Submit Button */}
//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={isLoading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
//             >
//               {isLoading ? (
//                 <div className="flex items-center space-x-2">
//                   <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Processing...</span>
//                 </div>
//               ) : (
//                 <span className="flex items-center space-x-2">
//                   <span>{authMode === 'login' ? 'Sign In' : 'Create Account'}</span>
//                   <Music className="w-4 h-4" />
//                 </span>
//               )}
//             </button>
//           </div>

//           {/* Switch Auth Mode */}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600">
//               {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
//               <button
//                 type="button"
//                 onClick={switchAuthMode}
//                 className="ml-2 font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
//               >
//                 {authMode === 'login' ? 'Sign up here' : 'Sign in here'}
//               </button>
//             </p>
//           </div>
//         </div>

//         {/* Back to Home */}
//         <div className="text-center">
//           <Link
//             to="/"
//             type="button"
//             className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             <span>Back to Home</span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Music, Eye, EyeOff, Mail, Lock, User, ArrowLeft, GraduationCap, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

type AuthMode = 'login' | 'signup';
type AccountType = 'student' | 'teacher';

interface FormData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullName?: string;
  accountType?: AccountType;
  // Student specific fields
  instrument?: string;
  experienceLevel?: string;
  // Teacher specific fields
  qualification?: string;
  teachingExperience?: string;
  specialization?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  fullName?: string;
  accountType?: string;
  instrument?: string;
  experienceLevel?: string;
  qualification?: string;
  teachingExperience?: string;
  specialization?: string;
}

interface FormProps {
  route: string;
  method: "login" | "signup"
}

export default function AuthPages({ route, method }: FormProps) {

  const [authMode, setAuthMode] = useState<AuthMode>(method);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    accountType: 'student',
    instrument: '',
    experienceLevel: '',
    qualification: '',
    teachingExperience: '',
    specialization: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Register-specific validations
    if (authMode === 'signup') {
      if (!formData.fullName) {
        newErrors.fullName = 'Full name is required';
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.accountType) {
        newErrors.accountType = 'Please select an account type';
      }

      // Student-specific validations
      if (formData.accountType === 'student') {
        if (!formData.instrument) {
          newErrors.instrument = 'Please select your primary instrument';
        }
        if (!formData.experienceLevel) {
          newErrors.experienceLevel = 'Please select your experience level';
        }
      }

      // Teacher-specific validations
      if (formData.accountType === 'teacher') {
        if (!formData.qualification) {
          newErrors.qualification = 'Please enter your qualifications';
        }
        if (!formData.teachingExperience) {
          newErrors.teachingExperience = 'Please select your teaching experience';
        }
        if (!formData.specialization) {
          newErrors.specialization = 'Please enter your specialization';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const accountTypeText = formData.accountType === 'teacher' ? 'Teacher' : 'Student';
      alert(`${authMode === 'login' ? 'Login' : `${accountTypeText} Registration`} successful!`);
    }, 1500);
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      accountType: 'student',
      instrument: '',
      experienceLevel: '',
      qualification: '',
      teachingExperience: '',
      specialization: ''
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-indigo-200 rounded-full opacity-15 animate-bounce"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-full">
              <Music className="w-8 h-8 text-white animate-spin" style={{animationDuration: '3s'}} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Musician's Mentor
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            {authMode === 'login' ? 'Welcome Back!' : 'Join the Community'}
          </h2>
        </div>

        {/* Auth Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
          <div className="space-y-6">
            {/* Account Type Selection - Signup Only */}
            {authMode === 'signup' && (
              <div className="transform transition-all duration-300 ease-in-out">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  I want to join as a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accountType: 'student' }))}
                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all duration-300 ${
                      formData.accountType === 'student'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-600'
                    }`}
                  >
                    <GraduationCap className="w-8 h-8 mb-2" />
                    <span className="font-medium">Student</span>
                    <span className="text-xs text-center">Learn from mentors</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, accountType: 'teacher' }))}
                    className={`flex flex-col items-center p-4 border-2 rounded-xl transition-all duration-300 ${
                      formData.accountType === 'teacher'
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-purple-300 text-gray-600'
                    }`}
                  >
                    <BookOpen className="w-8 h-8 mb-2" />
                    <span className="font-medium">Teacher</span>
                    <span className="text-xs text-center">Mentor students</span>
                  </button>
                </div>
                {errors.accountType && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.accountType}</p>
                )}
              </div>
            )}

            {/* Full Name - Register Only */}
            {authMode === 'signup' && (
              <div className="transform transition-all duration-300 ease-in-out">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.fullName ? 'border-red-500 shake' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.fullName}</p>
                )}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password - Register Only */}
            {authMode === 'signup' && (
              <div className="transform transition-all duration-300 ease-in-out">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Student-specific fields */}
            {authMode === 'signup' && formData.accountType === 'student' && (
              <div className="space-y-4 transform transition-all duration-300 ease-in-out">
                {/* Primary Instrument */}
                <div>
                  <label htmlFor="instrument" className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Instrument
                  </label>
                  <select
                    id="instrument"
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.instrument ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your primary instrument</option>
                    <option value="Piano">Piano</option>
                    <option value="Guitar">Guitar</option>
                    <option value="Violin">Violin</option>
                    <option value="Drums">Drums</option>
                    <option value="Voice">Voice/Singing</option>
                    <option value="Bass">Bass</option>
                    <option value="Saxophone">Saxophone</option>
                    <option value="Trumpet">Trumpet</option>
                    <option value="Flute">Flute</option>
                    <option value="Cello">Cello</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.instrument && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.instrument}</p>
                  )}
                </div>

                {/* Experience Level */}
                <div>
                  <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.experienceLevel ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your experience level</option>
                    <option value="Beginner">Beginner (0-1 years)</option>
                    <option value="Novice">Novice (1-2 years)</option>
                    <option value="Intermediate">Intermediate (2-5 years)</option>
                    <option value="Advanced">Advanced (5+ years)</option>
                    <option value="Expert">Expert/Professional</option>
                  </select>
                  {errors.experienceLevel && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.experienceLevel}</p>
                  )}
                </div>
              </div>
            )}

            {/* Teacher-specific fields */}
            {authMode === 'signup' && formData.accountType === 'teacher' && (
              <div className="space-y-4 transform transition-all duration-300 ease-in-out">
                {/* Qualifications */}
                <div>
                  <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
                    Qualifications
                  </label>
                  <input
                    id="qualification"
                    name="qualification"
                    type="text"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.qualification ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Bachelor's in Music, Grade 8 Piano, etc."
                  />
                  {errors.qualification && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.qualification}</p>
                  )}
                </div>

                {/* Teaching Experience */}
                <div>
                  <label htmlFor="teachingExperience" className="block text-sm font-medium text-gray-700 mb-2">
                    Teaching Experience
                  </label>
                  <select
                    id="teachingExperience"
                    name="teachingExperience"
                    value={formData.teachingExperience}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.teachingExperience ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your teaching experience</option>
                    <option value="New Teacher">New Teacher (0-1 years)</option>
                    <option value="Some Experience">Some Experience (1-3 years)</option>
                    <option value="Experienced">Experienced (3-7 years)</option>
                    <option value="Very Experienced">Very Experienced (7-15 years)</option>
                    <option value="Expert Teacher">Expert Teacher (15+ years)</option>
                  </select>
                  {errors.teachingExperience && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.teachingExperience}</p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization
                  </label>
                  <input
                    id="specialization"
                    name="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`block w-full px-3 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                      errors.specialization ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Classical Piano, Jazz Guitar, Vocal Training, etc."
                  />
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-red-600 animate-fade-in">{errors.specialization}</p>
                  )}
                </div>
              </div>
            )}

            {/* Forgot Password - Login Only */}
            {authMode === 'login' && (
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="text-sm text-center text-purple-600 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <span className="flex items-center space-x-2">
                  <span>
                    {authMode === 'login' 
                      ? 'Sign In' 
                      : `Create ${formData.accountType === 'teacher' ? 'Teacher' : 'Student'} Account`
                    }
                  </span>
                  <Music className="w-4 h-4" />
                </span>
              )}
            </button>
          </div>

          {/* Switch Auth Mode */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={switchAuthMode}
                className="ml-2 font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200 cursor-pointer"
              >
                {authMode === 'login' ? 'Sign up here' : 'Sign in here'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            to="/"
            type="button"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}