import { SignIn } from "../components/authorization/SignIn"
import styles from "./pages.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../components/hooks/useAuth"
import { useEffect } from "react"

export const Login = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isAuth) {
      navigate("/profile", { replace: true })
    }
  }, [isAuth, navigate])

  const fromPage = location.state?.from?.pathname || "/"

  return (
    <main className={styles.loginMain}>
      <SignIn />
    </main>
  )
}
