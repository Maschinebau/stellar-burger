import React from "react"
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import PropTypes from "prop-types"
import styles from "./burger-component.module.css"

export const BurgerComponent = React.memo(
  ({ isLocked, img, price, text, type, classes, onClose }) => {
  return (
    <div className={`${classes} ${styles.element}`}>
      {isLocked ? null : <DragIcon />}
      <ConstructorElement
        thumbnail={img}
        text={text}
        price={price}
        isLocked={isLocked}
        type={type}
        handleClose={onClose}
      />
    </div>
  )
})

BurgerComponent.propTypes = {
  count: PropTypes.number,
  img: PropTypes.string,
  price: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func
}
