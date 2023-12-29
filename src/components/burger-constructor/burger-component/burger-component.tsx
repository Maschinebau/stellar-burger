import React from "react"
import { DragIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components"
import styles from "./burger-component.module.css"

type BurgerComponentProps = {
  text: string
  price: number
  img: string
  type?: "top" | "bottom"
  isLocked?: boolean
  classes?: string
  onClose?: () => void
}

export const BurgerComponent = React.memo(
  ({ isLocked, img, price, text, type, classes, onClose }: BurgerComponentProps) => {
    return (
      <div className={`${classes} ${styles.element}`}>
        {isLocked ? null : <DragIcon type="primary" />}
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
  }
)
