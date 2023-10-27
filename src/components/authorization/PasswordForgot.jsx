import styles from "./authorization.module.css"
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import { useState } from "react"

export const PasswordForgot = () => {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <h2 className="text text_type_main-large">Регистрация</h2>
        <Input type="email" icon="undefined" placeholder="Укажите e-mail"></Input>
        <Button
          htmlType="button"
          type="primary"
          size="undefined"
          extraClass={`${styles.button} text text_type_main-default`}
        >
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive pt-20">
        Вспомнили пароль?{" "}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  )
}
