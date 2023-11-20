import { SignIn } from "../components/authorization/SignIn"
import styles from "./pages.module.css"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../components/hooks/useAuth"

export const Login = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  if (isAuth) {
    navigate("/profile", { replace: true })
  }

  const fromPage = location.state?.from?.pathname || "/"
  return (
    <main className={styles.loginMain}>
      <SignIn />
    </main>
  )
}
