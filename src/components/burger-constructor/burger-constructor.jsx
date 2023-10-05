import React, { useEffect, useState, memo, useContext } from "react"
import styles from "./burger-constructor.module.css"
import {
  Button,
  CurrencyIcon
} from "@ya.praktikum/react-developer-burger-ui-components"
import { BurgerComponent } from "./burger-component/burger-component"
import { Modal } from "../modal/modal"
import { OrderDetails } from "../popups/OrderDetails"
import { ingredientPropType } from "../../utils/prop-types"
import PropTypes from "prop-types"


export function BurgerConstructor({ ingredients }) {
  const [modalOpened, setModalOpen] = useState(false)
  const mains = ingredients.filter((item) => item.type !== "bun")
  const buns = ingredients.filter((item) => item.type === "bun")

  return (
    <section className={`${styles.constructor} custom-scroll`}>
      <BurgerComponent
        classes="mr-4 mb-4"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        type="top"
        img="https://code.s3.yandex.net/react/code/bun-01.png"
      />

      <ul className={`${styles.elements} custom-scroll`}>
        {mains.map((item) => (
          <li key={item._id}>
            <BurgerComponent
              text={item.name}
              img={item.image}
              price={item.price}
            />
          </li>
        ))}
      </ul>

      <BurgerComponent
        classes="mr-4 mt-4"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        type="bottom"
        img="https://code.s3.yandex.net/react/code/bun-01.png"
      />

      <div className={styles.purchase}>
        <div className={styles.summary}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          htmlType="button"
          type="primary"
          size="medium"
          extraClass={styles.button}
          onClick={() => setModalOpen(true)}
        >
          Оформить заказ
        </Button>
      </div>
      {modalOpened && (
        <Modal onClose={() => setModalOpen(false)}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  )
}

export default memo(BurgerConstructor)

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType).isRequired
}
