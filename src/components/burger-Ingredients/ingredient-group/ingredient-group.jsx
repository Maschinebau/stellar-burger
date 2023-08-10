import { IngredientItem } from '../ingredient-item/ingredient-item'
import styles from './ingredient-group.module.css'
import PropTypes from "prop-types"


export function IngredientGroup(props) {
  const { title, listItems, id } = props

  return (
    <div id={id}>
      <h2 className={`text text_type_main-medium pb-6`}>{title}</h2>
      <ul className={styles.list} >
        {listItems.map((item) =>
          <li key={item._id}>
            <IngredientItem ingredient={item} />
          </li>
        )}
      </ul>
    </div>
  )
}

IngredientGroup.propTypes = {
  imageLink: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  count: PropTypes.number,
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  imageLarge: PropTypes.string
}