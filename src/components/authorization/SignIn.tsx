import styles from "./authorization.module.css"
import { PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent } from "react"
import { loginRequest } from "../../store/slices/userSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useForm } from "../hooks/useForm"

export const SignIn = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { values, handleChange } = useForm({ email: "", password: "" })

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await dispatch(loginRequest(values))
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className="text text_type_main-large">Вход</h2>
        <EmailInput
          placeholder="E-mail"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name="email"
        ></EmailInput>
        <PasswordInput
          placeholder="Пароль"
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name="password"
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
