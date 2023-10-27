import { Account } from '../components/Account/Account'
import styles from './pages.module.css'

export const Profile = () => {

  return (
    <div className={styles.loginMain}>
      <Account/>
    </div>
  )
}