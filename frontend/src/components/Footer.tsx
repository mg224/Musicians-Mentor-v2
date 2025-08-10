import { Music } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex justify-between gap-8">
          <div>
            <h5 className="font-bold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Music className="w-8 h-8 text-purple-400" />
              <h4 className="text-xl font-bold">Musicians Mentor</h4>
            </div>
            <p className="text-gray-400 max-w-md">Connecting passionate musicians for affordable, quality music education.</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Musicians Mentor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}