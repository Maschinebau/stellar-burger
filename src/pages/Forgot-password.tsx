import { PasswordForgot } from "../components/authorization/PasswordForgot"
import styles from "./pages.module.css"
import { useAuth } from "../components/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const ForgotPassword = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate("/profile", { replace: true })
  }
  
  return (
    <main className={styles.loginMain}>
      <PasswordForgot />
    </main>
  )
}