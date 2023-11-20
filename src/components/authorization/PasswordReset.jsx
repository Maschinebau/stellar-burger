import styles from "./authorization.module.css"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, useRef, useCallback } from "react"
import { changePassword } from "../../utils/api"

export const PasswordReset = () => {
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const navigate = useNavigate()
  const passwortlInputRef = useRef()
  const tokenInputRef = useRef()

  const onSubmit = useCallback(() => {
    if (changePassword(password, token)) {
      navigate("/login/")
    } else {
      passwortlInputRef.current.error = true
      tokenInputRef.current.error = true
      passwortlInputRef.current.errorText = "Укажите, пожалуйста, корректный пароль"
      tokenInputRef.current.errorText = "Укажите, пожалуйста, правильный токен"
    }
  }, [password, navigate])

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwortlInputRef}
        ></PasswordInput>
        <Input
          type="text"
          icon="undefined"
          placeholder="Введите код из письма"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          ref={tokenInputRef}
        ></Input>
        <Button
          htmlType="button"
          extraClass={`${styles.button} text text_type_main-default`}
          onClick={onSubmit}
        >
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
