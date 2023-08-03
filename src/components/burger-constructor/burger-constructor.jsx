import styles from './burger-constructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerComponent } from './burger-component/burger-component'
import { data } from '../../utils/data'

export function BurgerConstructor() {
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const mains = data.filter((item) => item.type !== 'bun')
  const buns = data.filter((item) => item.type === 'bun')

  

  // const handleButtonClick = () => {
  //   setIsModalOpen(isModalOpen);
  // }

  return (
    <section className={`${styles.constructor} custom-scroll`}>

      <BurgerComponent 
      styles='mr-4 mb-4' 
      isLocked={true} 
      text='Краторная булка N-200i (верх)' 
      type='top' 
      img={buns[Math.floor(Math.random() * buns.length)].image} />

      <ul className={`${styles.elements} custom-scroll`}>
        {mains.map((item) =>
          <li key={item.id}>
            <BurgerComponent
              text={item.name}
              img={item.image}
              price={item.price}
            />
          </li>
        )}
      </ul>

      <BurgerComponent 
      styles='mr-4 mt-4' 
      isLocked={true} text='Краторная булка N-200i (низ)' 
      type='bottom' 
      img={buns[Math.floor(Math.random() * buns.length)].image} />
      
      <div className={styles.purchase}>
        <div style={{ display: 'flex', columnGap: '8px', alignItems: 'center', paddingRight: '40px' }}>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" style={{cursor: 'pointer'}} >Оформить заказ</Button>
      </div>
      
    </section>
  )
}