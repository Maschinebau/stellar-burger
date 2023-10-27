import styles from "./app-header.module.css"
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { NavItem } from "./nav-item/nav-item"

export function AppHeader() {
  return (
    <header className={`${styles.header} text`}>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavItem IconComponent={BurgerIcon} url="/">
              Конструктор
            </NavItem>
          </li>
          <li className={styles.item}>
            <NavItem IconComponent={ListIcon} url="/ingredients">
              Лента заказов
            </NavItem>
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
        <NavItem IconComponent={ProfileIcon} url="/login">
          Личный кабинет
        </NavItem>
      </nav>
    </header>
  )
}
