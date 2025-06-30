import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import LoginRegister from "./pages/LoginSignup"
import LandingPage from "./pages/LandingPage"
import UserDashboard from "./pages/UserDashboard"

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
          element={<LoginRegister
                    route="/api/auth/login"
                    method="login"
                   />}
        />
        <Route
          path="/signup"
          element={<LoginRegister
                    route="/api/auth/signup"
                    method="signup"
                   />}
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
