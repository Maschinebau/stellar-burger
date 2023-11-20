import styles from "./authorization.module.css"
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useState, useRef, useCallback } from "react"
import { sendResetMessage } from "../../utils/api"

export const PasswordForgot = () => {
  const [email, setEmail] = useState("")
  const navigate = useNavigate()
  const inputRef = useRef()
  const location = useLocation()

  const onSubmit = useCallback(() => {
    if (sendResetMessage(email)) {
      navigate("/login/reset-password")
      
    } else {
      inputRef.current.error = true
      inputRef.current.errorText = "Укажите, пожалуйста, правильную почту"
    }
  }, [email, navigate])

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <EmailInput
          type="email"
          icon="undefined"
          placeholder="Укажите e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          ref={inputRef}
        ></EmailInput>
        <Button
          htmlType="button"
          type="primary"
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
