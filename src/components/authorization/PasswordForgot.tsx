import styles from "./authorization.module.css"
import { EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { sendResetMessage } from "../../utils/api"
import { useForm } from "../hooks/useForm"

export const PasswordForgot = () => {
  const { values, handleChange } = useForm({ email: "" })
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (await sendResetMessage(values.email)) {
      navigate("/login/reset-password")
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <EmailInput
          placeholder="Укажите e-mail"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name='email'
        ></EmailInput>
        <Button
          htmlType="submit"
          type="primary"
          extraClass={`${styles.button} text text_type_main-default`}
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
