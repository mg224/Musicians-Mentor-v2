import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN } from "../constants"
import { useState, useEffect} from "react"
import type { ReactNode } from "react"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const auth = async () => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (!token) {
      setIsAuthorized(false)
      return
    }

    try {
      const decoded = jwtDecode(token)
      const tokenExpiration = decoded.exp
      const currentTimeInSeconds = Math.floor(Date.now() / 1000) // Convert milliseconds to seconds

      if (!tokenExpiration) {
        setIsAuthorized(false)
        return
      }

      if (tokenExpiration > currentTimeInSeconds) {
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.error("Error decoding token:", error)
      setIsAuthorized(false)
    }
  }

  if (isAuthorized === null) {
    return (
      <div>
        Loading...
      </div>
    )
  }

    return isAuthorized ? children : <Navigate to="/login" />
}