import React from "react"
import {  } from "react-router-dom"
import { Input } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./profile.module.css"

export const Account = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.wrapper}>
        <nav className={""}>
          {/* <NavLink>Профиль</NavLink>
          <NavLink>История заказов</NavLink>
          <NavLink>Выход</NavLink> */}
        </nav>
        <form className={styles.form}>
          <Input type="text" icon="EditIcon" placeholder="Имя"></Input>
          <Input type="email" icon="EditIcon" placeholder="Логин"></Input>
          <Input type="password" icon="EditIcon" placeholder="Пароль"></Input>
        </form>
      </div>
      <p className={`${styles.text} text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  )
}
