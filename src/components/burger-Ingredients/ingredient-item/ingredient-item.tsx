import { useState, useMemo, memo, useCallback } from "react"
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./ingredient-item.module.css"
import { useSelector, useDispatch } from "react-redux"
import { setCurrentIngredient } from "../../../store/slices/currentIngredientSlice"
import { useLocation, Link } from "react-router-dom"
import { TIngredient } from "../../../utils/types"
import { RootState } from "../../../store/rootReducer"
import type {} from "redux-thunk/extend-redux"

type TIngredientItemProps = {
  ingredient: TIngredient
}

export function IngredientItem({ ingredient }: TIngredientItemProps) {
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const orderedMains = useSelector((state: RootState) => state.burgerConstructor.mains)
  const orderedBuns = useSelector((state: RootState) => state.burgerConstructor.buns)
  const dispatch = useDispatch()
  const location = useLocation()

  const onClick = useCallback(() => {
    setIsClicked(true)
    dispatch(setCurrentIngredient(ingredient))
  }, [dispatch, setIsClicked, ingredient])

  const count = useMemo(() => {
    const orderedItems = [...orderedMains, ...orderedBuns]
    return orderedItems.filter((item) => item.name === ingredient.name).length
  }, [orderedMains, orderedBuns, ingredient.name])

  return (
    <>
      <Link
        key={ingredient._id}
        to={`/ingredients/${ingredient._id}`}
        state={{ background: location }}
        className={styles.link}
      >
        <div className={styles.item} onClick={onClick} id={ingredient._id}>
          <img className="pb-2" src={ingredient.image} alt={ingredient.name} loading="lazy" />
          <p className={`${styles.currency} text text_type_digits-default pb-2`}>
            {ingredient.price} <CurrencyIcon type="primary" />
          </p>
          <p className="text text_type_main-default">{ingredient.name}</p>
          <Counter
            count={count}
            size="default"
            extraClass={`m-1 ${count > 0 ? styles.visible : styles.hidden}`}
          />
        </div>
      </Link>
    </>
  )
}

export default memo(IngredientItem)
