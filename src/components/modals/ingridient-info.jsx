import styles from './modals.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

export function IngridientInfo({onClose, ...props}) {
  const { name, image, proteins, calories, fat, carbohydrates } = props

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.title} text text_type_main-large pt-3`}>Детали ингридиента</p>
      <img className={`${styles.picture} mb-4`} src={image}></img>
      <p className='text text_type_main-medium mb-9'>{name}</p>
        <ul className={`${styles.ul}`}>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{calories}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{proteins}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{fat}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{carbohydrates}</p>
          </li>
        </ul>
      <button onClick={onClose} className={styles.cross}>
        <CloseIcon />
      </button>
    </div>
  )
}