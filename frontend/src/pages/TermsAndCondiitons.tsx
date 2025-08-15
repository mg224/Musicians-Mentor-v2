import { Shield, Users, MessageSquare, ExternalLink, ArrowLeft, User } from 'lucide-react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/dashboard"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Terms and Conditions</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please read these terms carefully before using our music connection platform.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            
            {/* Platform Purpose */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Platform Purpose</h2>
              </div>
              <p className="text-gray-600 p-4">
                Our platform serves as a connection facilitator between music students and teachers. 
                We provide a space where users can create profiles and discover potential music education opportunities. 
                Our role is limited to facilitating these initial connections.
              </p>
            </section>

            {/* Profile Visibility */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Profile Visibility</h2>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-r-lg">
                  <h3 className="font-semibold mb-2">Teacher Profiles</h3>
                  <p>
                    Teacher profiles are publicly searchable and viewable by all users on the platform. 
                    This visibility is essential for students to find and connect with potential instructors.
                  </p>
                </div>
                
                <div className="p-4 rounded-r-lg">
                  <h3 className="font-semibold mb-2">Student Profiles</h3>
                  <p>
                    While student profiles are not explicitly searchable through our platform's search functionality, 
                    they may still be discoverable through other means. We cannot guarantee complete privacy of any profile information.
                  </p>
                </div>
              </div>
            </section>

            {/* External Communications */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-full">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">External Communications and Transactions</h2>
              </div>
              <p className="text-gray-600 leading-relaxed mb-4 p-4">
                Once users connect through our platform and begin communicating outside of our website, 
                all subsequent interactions, arrangements, and transactions are entirely between the users involved.
              </p>
              <div className="p-4 rounded-r-lg">
                <p className="text-red-700">
                  <strong>Important:</strong> We are not responsible for any agreements, payments, services, 
                  disputes, or issues that arise from communications or transactions that occur outside of our platform.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                  <ExternalLink className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 p-4">
                <p className="text-gray-600 leading-relaxed">
                  By using our platform, you acknowledge and agree that:
                </p>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>We are not liable for any unauthorized access to or disclosure of your profile information</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>We are not responsible for the quality, safety, or legality of services provided by teachers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>We are not involved in any financial transactions between users</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Users are responsible for conducting their own due diligence before engaging in any arrangements</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* User Responsibility */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-amber-100 rounded-full">
                  <User className="w-5 h-5 text-amber-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">User Responsibility</h2>
              </div>
              <p className="text-gray-600 leading-relaxed p-4">
                Users are solely responsible for all interactions, communications, and transactions that occur 
                after initial contact is made through our platform. We strongly encourage users to exercise 
                caution and good judgment when meeting or conducting business with other users.
              </p>
            </section>

            {/* Contact Information */}
            <section className="border-t border-gray-200 pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions?</h2>
              <p className="text-gray-600 p-4">
                If you have any questions about these terms and conditions, please contact us through our support channels.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}