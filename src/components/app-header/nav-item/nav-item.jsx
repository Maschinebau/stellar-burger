import styles from "./nav-item.module.css"
import { NavLink, useMatch } from "react-router-dom"
import { useState, useEffect } from "react"

export function NavItem(props) {
  const { IconComponent, url } = props
  const [isActive, setIsActive] = useState(false)
  
  const match = useMatch({
    path: url,
    end: true
  })

  useEffect(() => {
    setIsActive(match !== null)
  }, [match])

  return (
    <div className={styles.item}>
      <IconComponent type={isActive ? "primary" : "secondary"} />
      <NavLink
        className={({ isActive }) =>
          `${styles.text} text_type_main-default text_color_inactive ${isActive ? styles.active : ""}`
        }
        to={props.url}
      >
        {props.children}
      </NavLink>
    </div>
  )
}
