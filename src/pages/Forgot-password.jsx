import { PasswordForgot } from "../components/authorization/PasswordForgot"
import styles from "./pages.module.css"

export const ForgotPassword = () => {
  return (
    <main className={styles.loginMain}>
      <PasswordForgot />
    </main>
  )
}