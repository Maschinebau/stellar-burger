import { Account } from "../components/account/Account"
import styles from "./pages.module.css"
import { NavLink, useMatch } from "react-router-dom"
import { useState, useEffect } from "react"

export const Profile = () => {


  return (
    <div className={styles.profile}>
      <nav className={styles.profileNav}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.activeNav : ""}`
          }
          to='/profile'
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.active : ""}`
          }
          to='/orders-history'
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.active : ""}`
          }
          to=''
        >
          Выход
        </NavLink>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Account />
    </div>
  )
}
