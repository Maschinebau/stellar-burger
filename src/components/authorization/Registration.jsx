import styles from "./authorization.module.css"
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import { createUser } from "../../utils/api"
import React, { useState } from "react"

export const Registration = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onButtonClick = () => {
    createUser(name, email, password)
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Регистрация</h2>
        <Input
          type="text"
          icon="undefined"
          placeholder="Имя"
          onChange={(e) => setName(e.target.value)}
        ></Input>
        <Input
          type="email"
          icon="undefined"
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)}></Input>
        <Button
          htmlType="button"
          type="primary"
          extraClass={`${styles.button} text text_type_main-default`}
          onClick={onButtonClick}
          // disabled={allOrderedIngredients.length > 0 ? false : true}
        >
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Уже зарегистрированы?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
