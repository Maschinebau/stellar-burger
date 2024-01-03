import styles from "./authorization.module.css"
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useState } from "react"
import { createUser } from "../../store/slices/userSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useForm } from "../hooks/useForm"

export const Registration = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { values, handleChange } = useForm({ name: "", email: "", password: "" })

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await dispatch(createUser(values))
    if (createUser.fulfilled.match(res)) {
      console.log("User created successfully")
      navigate("/", { replace: true })
    } else {
      console.error("Error during registration")
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-large">Регистрация</h2>
        <Input
          type="text"
          placeholder="Имя"
          value={values.name}
          onChange={(e) => handleChange(e)}
          name="name"
        />
        <EmailInput
          placeholder="E-mail"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name="email"
        />
        <PasswordInput
          placeholder="Пароль"
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          name="password"
        />
        <Button htmlType="submit" type="primary" extraClass={`${styles.button} text text_type_main-default`}>
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
