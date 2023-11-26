import styles from "../orderInfo/orderInfo.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { getOrders } from "../../store/slices/allOrdersSlise"
import { Spinner } from "../spinner/spinner"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"

export const OrderInfo = () => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const background = location.state && location.state.background
  const orders = useSelector((state) => state.allOrders.orders)
  const currentOrder = orders.find((order) => order._id === id)
  const ingredients = useSelector((state) => state.ingredients.ingredients)

  useEffect(() => {
    dispatch(getOrders())
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  if (!currentOrder || !ingredients) {
    return <Spinner />
  }

  const getIngredientField = (ingredientId, field) => {
    const ingredient = ingredients.find((item) => item._id === ingredientId)
    return ingredient ? ingredient[field] : null
  }

  const ingredientCount = () => {
    const countIngredients = (ingredientId) => {
      const count = currentOrder.ingredients.filter((item) => item === ingredientId)
      return count.length
    }

    return countIngredients
  }

  const getTotalPrice = () => {
    const matchingIngredients = ingredients.filter((ingredient) =>
      currentOrder.ingredients.includes(ingredient._id)
    )
    const total = matchingIngredients.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0)
    return total
  }

  return (
    <section className={`${styles.orderInfo} ${!background && styles.orderInfoPage}`}>
      {ingredients || orders ? (
        <>
          <p className={`${styles.number} text text_type_digits-default pb-10`}># {currentOrder.number}</p>
          <h1 className="text_type_main-medium pb-3">{currentOrder.name}</h1>
          {currentOrder.status &&
            (currentOrder.status === "done" ? (
              <p className="text text_type_main-default pb-15" style={{ color: "green" }}>
                выполнен
              </p>
            ) : (
              <p className="text text_type_main-default pb-15">готовится</p>
            ))}
          <div>
            <h2 className="text_type_main-medium pb-6">Состав:</h2>

            <ul className={`${styles.ingredientsList} custom-scroll`}>
              {currentOrder.ingredients
                .filter((ingredientId, index, self) => self.indexOf(ingredientId) === index)
                .map((ingredientId, index) => (
                  <li key={`${ingredientId}-${index}`} className={styles.ingredientItem}>
                    <div className={styles.nameContainer}>
                      <div className={styles.ingredient}>
                        <img
                          className={styles.img}
                          src={getIngredientField(ingredientId, "image_mobile")}
                          alt="ингредиент"
                        />
                      </div>
                      <p className="text text_type_main-default">
                        {getIngredientField(ingredientId, "name")}
                      </p>
                    </div>

                    <div className={styles.summary}>
                      <p className="text text_type_digits-default">{`${ingredientCount(ingredientId)(
                        ingredientId
                      )} x ${getIngredientField(ingredientId, "price")}`}</p>
                      <CurrencyIcon />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={styles.info}>
            <FormattedDate
              date={new Date(currentOrder.createdAt)}
              className={"text text_type_main-default text_color_inactive"}
            />
            <div className={styles.summary}>
              <p className="text text_type_digits-default">{getTotalPrice()}</p>
              <CurrencyIcon />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  )
}
