import React, { useState, useEffect } from 'react'
import { Music, Users, Play, UserPlus, Heart, Award, BookOpen, MessageCircle, type LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
}

interface HowItWorksStep {
  step: string
  title: string
  desc: string
  icon: LucideIcon
}

interface VisibilityState {
  [key: string]: boolean
}

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState<VisibilityState>({})

  const features: Feature[] = [
    { icon: Award, title: "Experienced Teachers", desc: "Connect with skilled musicians who are passionate about teaching" },
    { icon: Heart, title: "Affordable Learning", desc: "Peer-to-peer lessons mean lower costs for students and better opportunities for mentors." },
    { icon: UserPlus, title: "Easy Matching", desc: "Simple profiles and intuitive matching tools for students to find teachers" },
    { icon: Heart, title: "Free & Inclusive", desc: "A free-to-join, inclusive community that supports musical growth and creativity" }
  ]

  const howItWorks: HowItWorksStep[] = [
    { step: "1", title: "Browse Mentors", desc: "Explore profiles of talented student musicians in your area or online", icon: BookOpen },
    { step: "2", title: "Connect & Chat", desc: "Connect with musicians to find the perfect match for your learning style", icon: MessageCircle },
    { step: "3", title: "Start Learning", desc: "Schedule affordable lessons and begin your musical journey", icon: Music }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect();
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-yellow-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-green-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <header className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-50 animate-pulse"></div>
        <nav className="relative z-10 container mx-auto px-6 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Music className="w-10 h-10 animate-spin" style={{animationDuration: '3s'}} />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              Musician's Mentor
            </h1>
          </div>
          <div className="flex space-x-4">
            <Link 
              to="/login"
              className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Log In
            </Link>
            <Link 
              to="/signup"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </nav>
      </header>

      <section id="hero" className="relative bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Musician's Mentor
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connecting student musicians for affordable, peer-to-peer music lessons.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/signup"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-5 h-5" />
                <span>Get Started</span>
              </Link>
              <Link 
                to="/login"
                className="border-2 border-purple-500 text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-500 hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
              >
                <Users className="w-5 h-5" />
                <span>Browse Musicians</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              What is Musicians Mentor?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Musician's Mentor is a platform that aims to increase accesibility to music education by connecting young music students with experienced student musicians for affordable private lessons. It's <span className="font-semibold">completely free</span> to use!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-lg hover:shadow-2xl transform transition-all duration-200 hover:-translate-y-2 ${isVisible.features ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{transitionDelay: `${index * 100}ms`}}
              >
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:rotate-12 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h3 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              How It Works
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 ${isVisible['how-it-works'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{transitionDelay: `${index * 200}ms`}}
              >
                <div className="relative mb-8">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transform hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -left-2 bg-yellow-400 text-purple-800 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-gray-600 text-sm text-center mt-12">
            <p>At this time, we are passing off the contact and booking process to students and teachers to discuss independently.</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h3 className="text-4xl font-bold mb-6">
            Ready to Start?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a beginner looking for a private teacher or an experienced musician looking to share your knowledge, join our community to help increase accessibility to music education for all
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login"
              className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer"
            >
              Find a Teacher
            </Link>
            <Link 
              to="/login"
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              Become a Teacher
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Music className="w-8 h-8 text-purple-400" />
                <h4 className="text-xl font-bold">Musicians Mentor</h4>
              </div>
              <p className="text-gray-400">Connecting passionate musicians for affordable, quality music education.</p>
            </div>
            <div>
              <h5 className="font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Mentors</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Musicians Mentor. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}