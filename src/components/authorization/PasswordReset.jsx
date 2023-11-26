import styles from "./authorization.module.css"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useCallback } from "react"
import { changePassword } from "../../utils/api"

export const PasswordReset = () => {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  console.log(token)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (await changePassword(password, token)) {
      navigate("/login/")
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>
        <Input
          type="text"
          icon="undefined"
          placeholder="Введите код из письма"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        ></Input>
        <Button htmlType="submit" extraClass={`${styles.button} text text_type_main-default`}>
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Вспомнили пароль?{" "}
        <Link to="../" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
