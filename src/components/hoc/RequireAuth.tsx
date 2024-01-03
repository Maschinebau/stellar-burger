import { useLocation, Navigate, RouteProps } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { ReactNode } from "react"

type TrequireAuth = {
  children: ReactNode
}

export const RequireAuth = ({ children }: TrequireAuth) => {
  const location = useLocation()
  const { isAuth } = useAuth()

  return isAuth ? <>{children}</> : <Navigate to="/login" state={{ from: location }} />
}

type ProtectedRouteProps = {
  children: ReactNode
  anonymous?: boolean
} & RouteProps

export const ProtectedRoute = ({ children, anonymous = false, ...routeProps }: ProtectedRouteProps) => {
  const { isAuth } = useAuth()
  const location = useLocation()
  const from = (location.state as { from: string })?.from || "/"

  // Если разрешен неавторизованный доступ, а пользователь авторизован...
  if (anonymous && isAuth) {
    // ...то отправляем его на предыдущую страницу
    return <Navigate to={from} />
  }

  // Если требуется авторизация, а пользователь не авторизован...
  if (!anonymous && !isAuth) {
    // ...то отправляем его на страницу логин
    return <Navigate to="/login" state={{ from: location }} />
  }

  // Если все ок, то рендерим внутреннее содержимое
  return <>{children}</>
}
