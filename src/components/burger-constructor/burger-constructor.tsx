import { useState, memo, useMemo, useCallback } from "react"
import styles from "./burger-constructor.module.css"
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { BurgerComponent } from "./burger-component/burger-component"
import { Modal } from "../modal/Modal"
import { OrderDetails } from "../popups/OrderDetails"
import { useSelector, useDispatch } from "react-redux"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { removeFromConstructor, updateMains, updateBuns } from "../../store/slices/constructorSlice"
import { postOrder } from "../../store/slices/orderSlice"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Spinner } from "../spinner/spinner"
import { RootState } from "../../store/rootReducer"
import { TIngredient } from "../../utils/types"

export function BurgerConstructor() {
  const [modalOpened, setModalOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isAuth } = useAuth()

  const orderNumber = useSelector((state: RootState) => state.order.orderNumber)
  const orderedMains = useSelector((state: RootState) => state.burgerConstructor.mains)
  const orderedBuns = useSelector((state: RootState) => state.burgerConstructor.buns)

  const orderedBun = orderedBuns.find((item) => item.type === "bun")

  //тут все ингредиенты отфильтрованы для удаления лишних значений
  const allOrderedIngredients = useMemo(
    () => [orderedBun, ...orderedMains, orderedBun].filter(Boolean) as TIngredient[],
    [orderedMains, orderedBuns]
  )
  const ids = allOrderedIngredients.map((ingredient) => ingredient?._id)

  const totalPrice = useMemo(() => {
    return allOrderedIngredients.reduce((sum, item) => sum + item.price, 0)
  }, [allOrderedIngredients])

  const removeIngredient = useCallback(
    (ingredientId: TIngredient["dragId"]) => {
      dispatch(removeFromConstructor(ingredientId))
    },
    [dispatch]
  )

  const handleOrderCreate = useCallback(() => {
    if (!isAuth) navigate("/login")
    if (isAuth) {
      setModalOpen(true)
      dispatch(postOrder(ids))
      dispatch(updateMains([]))
      dispatch(updateBuns([]))
    }
  }, [isAuth, navigate, dispatch, ids])

  return (
    <Droppable droppableId="constructor" type="ingredients" isCombineEnabled={true}>
      {(provided, snapshot) => (
        <section
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`${styles.constructor} custom-scroll`}
          style={{
            transition: "box-shadow 0.3s ease-in-out, border-radius 0.3s ease-in-out",
            borderRadius: "80px",
            ...(snapshot.isDraggingOver && {
              boxShadow: "0 0 40px rgba(128, 26, 178, 0.8)",
              overflow: "hidden"
            })
          }}
        >
          <div className={styles.wrapper}>
            {orderedBun ? (
              <BurgerComponent
                classes="mr-8"
                isLocked={true}
                text={`${orderedBun.name} (верх)`}
                type="top"
                img={orderedBun.image}
                price={orderedBun.price}
              />
            ) : (
              <div className={`${styles.top} ${styles.placeholder}`}>
                <p className="text_type_main-default">Перетащите сюда вашу булку</p>
              </div>
            )}

            {orderedMains.length > 0 ? (
              <Droppable droppableId="constructorList" type="ingredients" isCombineEnabled={true}>
                {(provided, snapshot) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`${styles.elements} custom-scroll`}
                  >
                    {orderedMains.map((item, index) => (
                      <Draggable key={item.dragId} draggableId={item.dragId || ""} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <BurgerComponent
                              text={item.name}
                              img={item.image}
                              price={item.price}
                              onClose={() => removeIngredient(item.dragId)}
                            />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            ) : (
              <div className={`${styles.middle} ${styles.placeholder}`}>
                <p className="text_type_main-default">Перетащите сюда ингредиенты</p>
              </div>
            )}

            {orderedBun ? (
              <BurgerComponent
                classes="mr-8"
                isLocked={true}
                text={`${orderedBun.name} (низ)`}
                type="bottom"
                img={orderedBun.image}
                price={orderedBun.price}
              />
            ) : (
              <div className={`${styles.bottom} ${styles.placeholder}`}>
                <p className="text_type_main-default">Перетащите сюда вашу булку</p>
              </div>
            )}

            <div className={styles.purchase}>
              <div className={styles.summary}>
                <p className="text text_type_digits-medium">{totalPrice}</p>
                <CurrencyIcon type="primary" />
              </div>
              <Button
                htmlType="button"
                type="primary"
                size="medium"
                extraClass={styles.button}
                onClick={handleOrderCreate}
                disabled={allOrderedIngredients.length > 0 ? false : true}
              >
                Оформить заказ
              </Button>
            </div>
            {modalOpened && (
              <Modal onClose={() => setModalOpen(false)}>
                {orderNumber ? (
                  <OrderDetails orderNumber={orderNumber} />
                ) : (
                  <Spinner extraClass={styles.burgerSpinner} />
                )}
              </Modal>
            )}
          </div>
        </section>
      )}
    </Droppable>
  )
}

export default memo(BurgerConstructor)
