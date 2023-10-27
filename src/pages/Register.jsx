import { Registration } from "../components/authorization/Registration"
import styles from "./pages.module.css"

export const Register = () => {
  return (
    <main className={styles.loginMain}>
      <Registration />
    </main>
  )
}
