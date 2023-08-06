import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from "prop-types"

export function BurgerComponent(props) {
  const {isLocked, img, price, text, type, styles} = props
  
  return (
    <div className={styles} style={{display: 'flex', columnGap: '8px', alignItems: 'center', justifyContent: 'flex-end'}}>
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