import styles from './nav-item.module.css'

export function NavItem (props) {
  const {isActive, IconComponent} = props
  const classNames = `${styles.item} text_type_main-default ${!isActive ? 'text_color_inactive' : ''}`
  return (
    <div className={classNames}>
    <IconComponent type={isActive ? 'primary' : 'secondary'} />
    <p className={styles.text}>{props.children}</p>
    </div>
  )
}