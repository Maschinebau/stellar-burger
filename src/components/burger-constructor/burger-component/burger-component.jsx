import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types"
import styles from './burger-component.module.css'

export function BurgerComponent(props) {
  const {isLocked, img, price, text, type, classes} = props
  
  return (
    <div className={`${classes} ${styles.element}`}>
      {isLocked ? null : <DragIcon />} 
      <ConstructorElement thumbnail={img} text={text} price={price} isLocked={isLocked} type={type}/>
    </div>
  )
}

BurgerComponent.propTypes = {
  count: PropTypes.number,
  img: PropTypes.string,
  price: PropTypes.number,
  text: PropTypes.string,
  type: PropTypes.string
}