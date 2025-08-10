import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants"
import { useState, useEffect} from "react"
import type { ReactNode } from "react"
import api from "../utils/api"

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null)

  useEffect(() => {
    auth().catch(() => setIsAuthorized(false))
  }, [])

  const refresh = async () => {
    const refreshToken = sessionStorage.getItem(REFRESH_TOKEN)

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken
      })
      if (res.status === 200) {
        sessionStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      } else {
        setIsAuthorized(false)
      }
    } catch (error) {
      console.log(error)
      setIsAuthorized(false)
    }
  }

  const auth = async () => {
    const token = sessionStorage.getItem(ACCESS_TOKEN)

    if (!token) {
      setIsAuthorized(false)
      return
    }

    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000

    if (!tokenExpiration) {
      setIsAuthorized(false)
      return
    }

    if (tokenExpiration < now) {
      await refresh()
    } else {
      setIsAuthorized(true)
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