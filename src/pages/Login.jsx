import { SignIn } from "../components/authorization/SignIn"
import styles from "./pages.module.css"

export const Login = () => {
  return (
    <main className={styles.loginMain}>
      <SignIn />
    </main>
  )
}
