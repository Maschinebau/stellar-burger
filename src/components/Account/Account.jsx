import React, {useState} from "react"
import {} from "react-router-dom"
import { Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./profile.module.css"
import { useAuth } from '../hooks/useAuth'

export const Account = () => {
  const { isAuth, email, name } = useAuth()
  const [username, setUsername] = useState(name)
  const [login, setLogin] = useState(email)
  const [password, setPassword] = useState('******')

  

  return (
    <div className={styles.account}>
        <form className={styles.form}>
          <Input type="text" icon="EditIcon" placeholder="Имя" value={username} onChange={(e) => setUsername(e.target.value)} ></Input>
          <EmailInput type="email" icon="EditIcon" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)}></EmailInput>
          <PasswordInput type="password" icon="EditIcon" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}></PasswordInput>
        </form>
    </div>
  )
}
