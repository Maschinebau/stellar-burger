import styles from "./authorization.module.css"
import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { useState, FormEvent, ChangeEvent } from "react"
import { changePassword } from "../../utils/api"
import { useForm } from "../hooks/useForm"

export const PasswordReset = () => {
  const { values, handleChange } = useForm({ password: "", token: "" })
  const navigate = useNavigate()

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (await changePassword(values.password, values.token)) {
      navigate("/login/")
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-large">Восстановление пароля</h2>
        <PasswordInput
          placeholder="Введите новый пароль"
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name='password'
        ></PasswordInput>
        <Input
          type="text"
          placeholder="Введите код из письма"
          value={values.token}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name='token'
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
