import { useState, useMemo, memo } from "react"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { Modal } from "../../modal/modal"
import { IngredientDetails } from "../../popups/IngredientDetails"
import styles from "./ingredient-item.module.css"
import { ingredientPropType } from "../../../utils/prop-types"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentIngredient } from "../../../store/slices/currentIngredientSlice"
import { useNavigate, useLocation, Link } from "react-router-dom"

export function IngredientItem({ ingredient }) {
  const [isClicked, setIsClicked] = useState(false)
  const orderedMains = useSelector((state) => state.burgerConstructor.mains)
  const orderedBuns = useSelector((state) => state.burgerConstructor.buns)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const ingredientId = ingredient["_id"]

  const onClick = () => {
    setIsClicked(true)
    dispatch(setCurrentIngredient(ingredient))
    // navigate(`/ingredients/${ingredient._id}`, { state: { background: true } })
  }

  const count = useMemo(() => {
    const orderedItems = [...orderedMains, ...orderedBuns]
    return orderedItems.filter((item) => item.name === ingredient.name).length
  }, [orderedMains, orderedBuns, ingredient.name])

  return (
    <>
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.item} onClick={onClick} id={ingredient._id}>
          <img className="pb-2" src={ingredient.image} alt={ingredient.name} loading="lazy" />
          <p className={`${styles.currency} text text_type_digits-default pb-2`}>
            {ingredient.price} <CurrencyIcon />
          </p>
          <p className="text text_type_main-default">{ingredient.name}</p>
          <Counter
            count={count}
            size="default"
            extraClass={`m-1 ${count > 0 ? styles.visible : styles.hidden}`}
          />
        </div>
        {/* {isClicked && (
        <Modal onClose={() => setIsClicked(!isClicked)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>
      )} */}
      </Link>
    </>
  )
}

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired
}

export default memo(IngredientItem)
