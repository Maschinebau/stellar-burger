import styles from './popups.module.css'

export function IngredientDetails({ingredient}) {

  return (
    <div className={styles.wrapper}>
      <p className={`${styles.title} text text_type_main-large pt-3`}>Детали ингридиента</p>
      <img className={`${styles.picture} mb-4`} src={ingredient.image_large} alt={ingredient.name}></img>
      <p className='text text_type_main-medium mb-9'>{ingredient.name}</p>
        <ul className={`${styles.ul}`}>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
          </li>
          <li className={styles.li}>
            <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive pb-5">{ingredient.carbohydrates}</p>
          </li>
        </ul>
    </div>
  )
}