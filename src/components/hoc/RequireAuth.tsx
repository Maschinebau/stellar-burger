import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

type TrequireAuth = {
  children: React.ReactNode
}

export const RequireAuth = ({ children }: TrequireAuth) => {
  const location = useLocation()
  const { isAuth } = useAuth()

  return isAuth ? <>{children}</> : <Navigate to="/login" state={{ from: location }} />
}
