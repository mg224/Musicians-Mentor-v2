import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import LandingPage from "./pages/LandingPage"
import UserDashboard from "./pages/UserDashboard"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import VerifyAccountPage from "./pages/Verify"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={<LandingPage />} 
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/signup"
          element={<RegisterPage />}
        />
        <Route
          path="verify"
          element={<VerifyAccountPage />}
        />
        <Route 
          path="/home" 
          element={<UserDashboard />} 
        />
        <Route 
          path="*" 
          element={<NotFound />} 
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
