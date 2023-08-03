import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from './ingridient-item.module.css'

export function IngridientItem(props) {
  const { imageLink, price, name, count } = props

  return (
    <li className={styles.item}>
      <img className="pb-2" src={imageLink} alt={name}/>
      <p className="text text_type_digits-default pb-2" style={{ display: 'flex', gap: '8px' }}>{price} <CurrencyIcon /></p>
      <p className="text text_type_main-default">{name}</p>
      <Counter count={count} size="default" extraClass={`m-1 ${count >= 0 ? styles.visible : styles.hidden }`} />
    </li>
  )
}