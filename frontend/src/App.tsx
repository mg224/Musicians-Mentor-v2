import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./pages/NotFound"
import LandingPage from "./pages/LandingPage"
import UserDashboard from "./pages/UserDashboard"
import LoginPage from "./pages/Login"
import RegisterPage from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import Search from "./pages/Search"
import SettingsPage from "./pages/Settings"
import TermsAndConditions from "./pages/TermsAndCondiitons"
import TeacherPage from "./pages/TeacherPage"
import Contact from "./pages/Contact"

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
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/search" 
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/teacherPage/:teacherId" 
          element={
            <ProtectedRoute>
              <TeacherPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/terms" 
          element={
            <TermsAndConditions />
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Contact />
          } 
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
