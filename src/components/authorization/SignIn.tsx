import styles from "./authorization.module.css"
import { PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, MouseEvent } from "react"
import { useDispatch } from "react-redux"
import { loginRequest } from "../../store/slices/userSlice"

export const SignIn = () => {
  const [email, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(loginRequest({ email, password }))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className="text text_type_main-large">Вход</h2>
        <EmailInput
          placeholder="E-mail"
          value={email}
          onChange={(e) => setLogin(e.target.value)}
        ></EmailInput>
        <PasswordInput
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>
        <Button
          htmlType="submit"
          type="primary"
          extraClass={`${styles.button} text text_type_main-default`}
          disabled={false}
        >
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Вы - новый пользователь?{" "}
        <Link to="register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to="forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}
