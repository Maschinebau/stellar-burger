import styles from "./popups.module.css"
import { ingredientPropType } from "../../utils/prop-types"
import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Spinner } from "../spinner/spinner"

export function IngredientDetails() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const ingredient = ingredients.find((item) => item._id === id)
  const location = useLocation()
  const background = location.state && location.state.background

  useEffect(() => {
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  return (
    <div className={`${styles.wrapper} ${!background && styles.wrapperPage}`}>
      {ingredient ? (
        <>
          <p className={`${styles.title} text text_type_main-large pt-3`}>Детали ингридиента</p>
          <img
            className={`${styles.picture} mb-4`}
            src={ingredient.image_large}
            alt={ingredient.name}
            loading="lazy"
          ></img>
          <p className="text text_type_main-medium mb-9">{ingredient.name}</p>
          <ul className={`${styles.ul}`}>
            <li className={styles.li}>
              <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.calories}</p>
            </li>
            <li className={styles.li}>
              <p className="text text_type_main-default text_color_inactive">Белки, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.proteins}</p>
            </li>
            <li className={styles.li}>
              <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
              <p className="text text_type_digits-default text_color_inactive">{ingredient.fat}</p>
            </li>
            <li className={styles.li}>
              <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
              <p className="text text_type_digits-default text_color_inactive pb-5">
                {ingredient.carbohydrates}
              </p>
            </li>
          </ul>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  )
}

// IngredientDetails.propTypes = {
//   ingredient: ingredientPropType.isRequired
// }
