import { Registration } from "../components/authorization/Registration"
import styles from "./pages.module.css"
import { useAuth } from "../components/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Register = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate("/profile", { replace: true })
    }
  }, [isAuth, navigate])

  return (
    <main className={styles.loginMain}>
      <Registration />
    </main>
  )
}
