import { Account } from "../components/account/Account"
import { OrdersHistory } from "../components/orders-history/ordersHistory"
import styles from "./pages.module.css"
import { NavLink, useMatch } from "react-router-dom"
import { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useAuth } from '../components/hooks/useAuth'
import { resetUser } from '../store/slices/userSlice'
import { useDispatch } from "react-redux"

export const Profile = () => {
  const { isAuth, email, name } = useAuth()
  const dispatch = useDispatch()

  const onExit = () => {
    dispatch(resetUser())
  }


  return (
    <div className={styles.profile}>
      <nav className={styles.profileNav}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.activeNav : ""}`
          }
          to="/profile"
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.active : ""}`
          }
          to="/profile/orders"
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium text_color_inactive ${isActive ? styles.active : ""}`
          }
          to="/"
          onClick={() => onExit()}
        >
          Выход
        </NavLink>
        <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <Routes>
        <Route exact path="/" element={<Account />} />
        <Route path="/orders" element={<OrdersHistory/>} />
      </Routes>
    </div>
  )
}
