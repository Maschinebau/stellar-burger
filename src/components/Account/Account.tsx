import { ChangeEvent, FormEvent, useState } from "react"
import {} from "react-router-dom"
import { Input, PasswordInput, EmailInput, Button } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./profile.module.css"
import { useAuth } from "../hooks/useAuth"
import { changeUser } from "../../store/slices/userSlice"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useForm } from "../hooks/useForm"

export const Account = () => {
  const { isAuth, email, name } = useAuth()
  const [fieldDisabled, setDisabled] = useState(true)
  const { values, handleChange, setValues } = useForm({ name: name || "", email: email || "", password: "" })
  const [isFormChanged, setIsFormChanged] = useState(false)
  const dispatch = useAppDispatch()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (values.name !== null && values.email !== null) {
      await dispatch(changeUser(values))
    }
  }

  const onReset = () => {
    setValues({ name: name || "", email: email || "", password: "" })
    setIsFormChanged(false)
  }

  const handleInputChange = () => {
    setIsFormChanged(true)
  }

  return (
    <div className={styles.account}>
      <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
        <Input
          type="text"
          icon="EditIcon"
          placeholder="Имя"
          value={values.name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange()
            handleChange(e)
          }}
          name='name'
        ></Input>
        <EmailInput
          isIcon={true}
          placeholder="Логин"
          value={values.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange()
            handleChange(e)
          }}
          name='email'
        ></EmailInput>
        <PasswordInput
          icon="EditIcon"
          placeholder="Пароль"
          value={values.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleInputChange()
            handleChange(e)
          }}
          name='password'
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
