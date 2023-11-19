import { SignIn } from "../components/authorization/SignIn"
import styles from "./pages.module.css"
import { useNavigate, useLocation } from 'react-router-dom'

export const Login = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const fromPage = location.state?.from?.pathname || '/'
  return (
    <main className={styles.loginMain}>
      <SignIn />
    </main>
  )
}
