import styles from "./authorization.module.css"
import { Input, Button, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"
import { createUser } from "../../store/slices/userSlice"
import { useDispatch } from "react-redux"

export const Registration = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const res = await dispatch(createUser({ name, email, password }))
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
        <Input type="text" placeholder="Имя" value={name} onChange={(e) => setName(e.target.value)}></Input>
        <EmailInput
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></EmailInput>
        <PasswordInput
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></PasswordInput>
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
