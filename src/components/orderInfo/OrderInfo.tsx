import styles from "../orderInfo/orderInfo.module.css"
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect, memo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { getOrders } from "../../store/slices/allOrdersSlise"
import { Spinner } from "../spinner/spinner"
import { fetchIngredients } from "../../store/slices/ingredientsSlice"
import { BASE_URL } from "../../utils/constants"
import { RootState } from "../../store/rootReducer"
import { TIngredient, TOrder } from "../../utils/types"

export const OrderInfo = memo(() => {
  const { id } = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const background = location.state && location.state.background
  const orders = useSelector((state: RootState) => state.allOrders.orders)
  const currentOrder = orders.find((order: TOrder) => order._id === id)
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)

  useEffect(() => {
    dispatch(getOrders())
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  if (!currentOrder || !ingredients) {
    return <Spinner />
  }

  // функция для получения значений из обьекта по ключу
  const getIngredientField = <K extends keyof TIngredient>(
    ingredientId: TIngredient["_id"],
    key: K
  ): TIngredient[K] | null => {
    const ingredient = ingredients.find((item) => item._id === ingredientId)
    return ingredient ? ingredient[key] : null
  }

  const ingredientCount = (ingredientId: TIngredient["_id"]) => {
    const count = currentOrder.ingredients.filter((id) => id === ingredientId)
    return count.length
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
              <p className={`text text_type_main-default pb-15 ${styles.ready}`}>выполнен</p>
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
                          src={getIngredientField(ingredientId, "image_mobile") || ""}
                          alt="ингредиент"
                        />
                      </div>
                      <p className="text text_type_main-default">
                        {getIngredientField(ingredientId, "name")}
                      </p>
                    </div>

                    <div className={styles.summary}>
                      <p className="text text_type_digits-default">
                        {`${ingredientCount(ingredientId)} x ${
                          getIngredientField(ingredientId, "price") ?? 0
                        }`}
                      </p>
                      <CurrencyIcon type="primary" />
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
              <CurrencyIcon type="success" />
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </section>
  )
})
