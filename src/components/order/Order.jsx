import styles from "./order.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import { useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"



export const Order = ({ order, status, link }) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const location = useLocation()

  const getIngredientImage = useMemo(() => {
    return (ingredientId) => {
      const ingredient = ingredients.find((item) => item._id === ingredientId)
      return ingredient ? ingredient.image_mobile : ""
    }
  }, [ingredients])

  const getPrice = () => {
    const matchingIngredients = ingredients.filter((ingredient) => order.ingredients.includes(ingredient._id))
    const total = matchingIngredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0)
    return total
  }

  const totalPrice = getPrice()

  return (
    <Link state={{ background: location }} to={link} className={styles.link}>
      <li className={styles.order}>
        <div className={styles.orderInfo}>
          <p className="text text_type_digits-default"># {order.number}</p>
          <FormattedDate
            date={new Date(order.createdAt)}
            className={"text text_type_main-default text_color_inactive"}
          />
        </div>
        <div>
          <p className="text_type_main-medium">{order.name}</p>
          {status &&
            (order.status === "done" ? (
              <p className="text text_type_main-default" style={{ color: "green" }}>
                выполнен
              </p>
            ) : (
              <p className="text text_type_main-default">готовится</p>
            ))}
        </div>
        <div className={styles.ingredientsWrapper}>
          <ul className={styles.ingredients}>
            {order.ingredients.slice(0, 6).map((ingredientId, index) => (
              <li
                key={`${ingredientId}-${index}`}
                className={styles.ingredient}
              >
                <img className={styles.img} src={getIngredientImage(ingredientId)} alt='ингредиент'/>
              </li>
            ))}
          </ul>
          <div className={styles.summary}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon />
          </div>
        </div>
      </li>
    </Link>
  )
}

Order.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired
  }).isRequired
}
