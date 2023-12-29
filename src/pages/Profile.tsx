import styles from "./pages.module.css"
import { NavLink, useLocation, useMatch } from "react-router-dom"
import { Outlet } from "react-router-dom"
import { logout } from "../store/slices/userSlice"
import { useDispatch } from "react-redux"


export const Profile = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const onExit = () => {
    dispatch(logout())
  }

  return (
    <div className={styles.profile}>
      <nav className={styles.profileNav}>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium  ${isActive ? styles.active : "text_color_inactive"}`
          }
          to="/profile"
          end
        >
          Профиль
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium ${isActive ? styles.active : "text_color_inactive"}`
          }
          to="/profile/orders"
          end
        >
          История заказов
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.navItem} text_type_main-medium ${isActive ? styles.active : "text_color_inactive"}`
          }
          to="/"
          onClick={() => onExit()}
        >
          Выход
        </NavLink>
        <p className={`${styles.profileText} text text_type_main-default text_color_inactive`}>
          {location.pathname === "/profile"
            ? "В этом разделе вы можете изменить свои персональные данные"
            : "В этом разделе вы можете просмотреть свою историю заказов"}
        </p>
      </nav>
          <Outlet />
    </div>
  )
}
