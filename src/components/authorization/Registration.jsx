import styles from "./authorization.module.css"
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { createUser } from "../../utils/api"
import { useState } from "react"

export const Registration = () => {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onButtonClick = () => {
    createUser(name, email, password)
    navigate("/login/")
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Регистрация</h2>
        <Input
          type="text"
          icon="undefined"
          placeholder="Имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <EmailInput
          type="email"
          icon="undefined"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></EmailInput>
        <PasswordInput
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>
        <Button
          htmlType="button"
          type="primary"
          extraClass={`${styles.button} text text_type_main-default`}
          onClick={onButtonClick}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Уже зарегистрированы?{" "}
        <Link to="../" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
