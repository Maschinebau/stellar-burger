import React from "react"
import {} from "react-router-dom"
import { Input, PasswordInput, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./profile.module.css"

export const Account = () => {
  
  return (
    <div className={styles.account}>
        <form className={styles.form}>
          <Input type="text" icon="EditIcon" placeholder="Имя"></Input>
          <EmailInput type="email" icon="EditIcon" placeholder="Логин"></EmailInput>
          <PasswordInput type="password" icon="EditIcon" placeholder="Пароль"></PasswordInput>
        </form>
    </div>
  )
}
