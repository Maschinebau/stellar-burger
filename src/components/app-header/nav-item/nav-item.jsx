import styles from "./nav-item.module.css"
import { NavLink } from "react-router-dom"

export function NavItem(props) {
  const { isActive, IconComponent } = props

  const setActive = ({ isActive }) =>
    `${styles.text} text text_type_main-default ${!isActive ? "text_color_inactive" : ""}`
  return (
    <div className={styles.item}>
      <IconComponent type={isActive ? "primary" : "secondary"} />
      <NavLink className={setActive} to={props.url}>
        {props.children}
      </NavLink>
    </div>
  )
}
