import styles from "./nav-item.module.css"
import { NavLink, useMatch } from "react-router-dom"
import { useState, useEffect, ReactNode } from "react"

type TNavItemProps = {
  IconComponent: React.ComponentType<{ type: "primary" | "secondary" }>
  url: string
  children: ReactNode
}

export const NavItem = ({ IconComponent, url, children }: TNavItemProps) => {
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
        className={`${styles.text} text_type_main-default text_color_inactive ${
          isActive ? styles.active : ""
        }`}
        to={url}
      >
        {children}
      </NavLink>
    </div>
  )
}
