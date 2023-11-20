import { PasswordReset } from "../components/authorization/PasswordReset"
import styles from "./pages.module.css"
import { useAuth } from "../components/hooks/useAuth"
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

export const ResetPassword = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location)


    if (isAuth) {
      navigate("/profile", { replace: true })
    }
    if (location.state?.from !== "/login/forgot-password") {
      navigate("/login/forgot-password", { replace: true })
    }


  return (
    <main className={styles.loginMain}>
      <PasswordReset />
    </main>
  )
}
