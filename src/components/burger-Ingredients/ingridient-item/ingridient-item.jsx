import { useState, useEffect } from 'react'
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components"
import { ModalPortal } from '../../modal-portal/modal-portal'
import { IngridientInfo } from '../../modals/ingridient-info'
import styles from './ingridient-item.module.css'
import PropTypes from "prop-types"


export function IngridientItem(props) {
  const { imageLink, imageLarge, price, name, calories, proteins, fat, carbohydrates, key } = props
  const [isClicked, setHandleClick] = useState(false)
  const [count, setCount] = useState(0)

  const handleClick = (value) => {
    setHandleClick(value)
    setCount()
  }

  return (
    <li className={styles.item} onClick={() => handleClick(true)} key={key}>
      <img className="pb-2" src={imageLink} alt={name}/>
      <p className="text text_type_digits-default pb-2" style={{ display: 'flex', gap: '8px' }}>{price} <CurrencyIcon /></p>
      <p className="text text_type_main-default">{name}</p>
      <Counter count={count} size="default" extraClass={`m-1 ${count > 0 ? styles.visible : styles.hidden }`} />
      {isClicked &&
        <ModalPortal onOverlay={() => handleClick(false)}>
          <IngridientInfo 
          onClose={() => handleClick(false)}
          // не понимаю, почему не работает onClose =/
          calories={calories}
          proteins={proteins}
          fat={fat}
          carbohydrates={carbohydrates}
          name={name}
          image={imageLarge}
          />
        </ModalPortal>}
    </li>
  )
}

IngridientItem.propTypes = {
  imageLink: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  count: PropTypes.number,
  key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  calories: PropTypes.number,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  imageLarge: PropTypes.string
}