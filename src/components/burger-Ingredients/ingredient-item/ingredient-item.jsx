import { useState, useEffect } from 'react'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { Modal } from '../../modal/modal'
import { IngredientDetails } from '../../popups/IngredientDetails'
import styles from './ingredient-item.module.css'
import PropTypes from "prop-types"


export function IngredientItem({ ingredient }) {
  const [isClicked, setIsClicked] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.item} onClick={() => setIsClicked(true)} id={ingredient._id}>
        <img className="pb-2" src={ingredient.image} alt={ingredient.name} />
        <p className={`${styles.currency} text text_type_digits-default pb-2`}>{ingredient.price} <CurrencyIcon /></p>
        <p className="text text_type_main-default">{ingredient.name}</p>
        <Counter count={count} size="default" extraClass={`m-1 ${count > 0 ? styles.visible : styles.hidden}`} />

      </div>
      {isClicked &&
        <Modal onClose={() => setIsClicked(!isClicked)}>
          <IngredientDetails ingredient={ingredient} />
        </Modal>}
    </>
  )
}

IngredientItem.propTypes = {
  ingredient: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};