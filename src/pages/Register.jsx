import { Registration } from "../components/authorization/Registration"
import styles from "./pages.module.css"
import { useAuth } from "../components/hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  if (isAuth) {
    navigate("/profile", { replace: true })
  }

  return (
    <main className={styles.loginMain}>
      <Registration />
    </main>
  )
}
