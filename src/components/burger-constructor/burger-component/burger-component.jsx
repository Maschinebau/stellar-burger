import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

export function BurgerComponent(props) {
  const {isLocked, img, price, text, type, styles} = props
  
  return (
    <div className={styles} style={{display: 'flex', columnGap: '8px', alignItems: 'center', justifyContent: 'flex-end'}}>
      {isLocked ? null : <DragIcon />} 
      <ConstructorElement thumbnail={img} text={text} price={price} isLocked={isLocked} type={type}/>
    </div>
  )
}