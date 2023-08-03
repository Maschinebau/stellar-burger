import styles from './app-header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavItem } from './nav-item/nav-item';

export function AppHeader () {
  return (
    <header className={`${styles.header} text`}>
      <nav className={styles.navbar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <NavItem isActive={true} IconComponent={BurgerIcon} >Конструктор</NavItem>
          </li>
          <li className={styles.item}>
            <NavItem isActive={false} IconComponent={ListIcon} >Лента заказов</NavItem>
          </li>
        </ul>
        <div className={styles.logo}><Logo/></div>
        <NavItem isActive={false} IconComponent={ProfileIcon} >Личный кабинет</NavItem>
      </nav>
    </header> 
  )
}