import React, { useEffect, useState, memo } from "react"
import styles from './burger-constructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerComponent } from './burger-component/burger-component'
import { ModalPortal } from '../modal-portal/modal-portal'
import { OrderAccept } from '../modals/order-accept'
import { apiUrl } from '../../utils/constants'

export function BurgerConstructor() {
  const [modalOpened, setModalOpen] = useState(false)
  const [ingredients, setIngredients] = useState([])
  const mains = ingredients.filter((item) => item.type !== 'bun')
  const buns = ingredients.filter((item) => item.type === 'bun')
  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch(apiUrl)
      const array = await response.json()
      setIngredients(array.data)
    } catch (error) {
      console.error('Ошибка при получении ингредиентов:', error)
    }
  }



  return (
    <section className={`${styles.constructor} custom-scroll`}>

      <BurgerComponent
        styles='mr-4 mb-4'
        isLocked={true}
        text='Краторная булка N-200i (верх)'
        type='top'
        img = 'https://code.s3.yandex.net/react/code/bun-01.png'
      />

      <ul className={`${styles.elements} custom-scroll`}>
        {mains.map((item) =>
          <li >
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
        img = 'https://code.s3.yandex.net/react/code/bun-01.png'
      />

      <div className={styles.purchase}>
        <div style={{ display: 'flex', columnGap: '8px', alignItems: 'center', paddingRight: '40px' }}>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}>Оформить заказ</Button>
      </div>
      {modalOpened &&
        <ModalPortal onOverlay={() => setModalOpen(false)}>
          <OrderAccept onClose={() => setModalOpen(false)}/>
        </ModalPortal>}
    </section>
  )
}

export default memo(BurgerConstructor)