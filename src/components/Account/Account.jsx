import { useState } from "react"
import {} from "react-router-dom"
import { Input, PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./profile.module.css"
import { useAuth } from "../hooks/useAuth"
import { useDispatch } from "react-redux"
import { changeUser } from "../../store/slices/userSlice"

export const Account = () => {
  const { isAuth, email, name } = useAuth()
  const [username, setUsername] = useState(name)
  const [login, setLogin] = useState(email)
  const [password, setPassword] = useState('******')
  const [isFormChanged, setIsFormChanged] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    await dispatch(changeUser({ name: username, email: login, password }))
  }

  const onReset = () => {
    setUsername(name)
    setLogin(email)
    setPassword(null)
    setIsFormChanged(false)
  }

  const handleInputChange = () => {
    setIsFormChanged(true)
    setPassword('')
  }

  return (
    <div className={styles.account}>
      <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
        <Input
          type="text"
          icon="EditIcon"
          placeholder="Имя"
          value={username}
          onChange={(e) => {
            handleInputChange()
            setUsername(e.target.value)
          }}
        ></Input>
        <EmailInput
          type="email"
          icon="EditIcon"
          placeholder="Логин"
          value={login}
          onChange={(e) => {
            handleInputChange()
            setLogin(e.target.value)
          }}
        ></EmailInput>
        <PasswordInput
          type="password"
          icon="EditIcon"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            handleInputChange()
            setPassword(e.target.value)
          }}
        ></PasswordInput>
        <div className={styles.buttons}>
          <button
            disabled={!isFormChanged}
            type="reset"
            className={`${styles.resetButton} text text_type_main-default`}
          >
            Отмена
          </button>
          <Button
            disabled={!isFormChanged}
            htmlType="submit"
            extraClass={`${styles.submitButton} text text_type_main-default`}
          >
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
