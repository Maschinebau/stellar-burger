import {PasswordReset} from '../components/authorization/PasswordReset'
import styles from "./pages.module.css"

export const ResetPassword = () => {

  return (
    <main className={styles.loginMain}>
      <PasswordReset />
    </main>
  )
}