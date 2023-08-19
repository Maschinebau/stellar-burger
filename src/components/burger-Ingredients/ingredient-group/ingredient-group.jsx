import { IngredientItem } from '../ingredient-item/ingredient-item'
import styles from './ingredient-group.module.css'
import { ingredientPropType } from "../../../utils/prop-types"
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
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string,
}