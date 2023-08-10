import React, { useEffect, useState, memo } from "react"
import styles from './burger-constructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerComponent } from './burger-component/burger-component'
import { Modal } from '../modal/modal'
import { OrderDetails } from '../popups/OrderDetails'
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
      if (!response.ok) {
        throw new Error('Server response was not ok')
      }
      const array = await response.json()
      setIngredients(array.data)
    } catch (error) {
      console.error('Ошибка при получении ингредиентов:', error)
    }
  }



  return (
    <section className={`${styles.constructor} custom-scroll`}>

      <BurgerComponent
        classes='mr-4 mb-4'
        isLocked={true}
        text='Краторная булка N-200i (верх)'
        type='top'
        img='https://code.s3.yandex.net/react/code/bun-01.png'
      />

      <ul className={`${styles.elements} custom-scroll`}>
        {mains.map((item) =>
          <li key={item._id}>
            <BurgerComponent
              text={item.name}
              img={item.image}
              price={item.price}
            />
          </li>
        )}
      </ul>

      <BurgerComponent
        classes='mr-4 mt-4'
        isLocked={true} text='Краторная булка N-200i (низ)'
        type='bottom'
        img='https://code.s3.yandex.net/react/code/bun-01.png'
      />

      <div className={styles.purchase}>
        <div className={styles.summary}>
          <p className='text text_type_digits-medium'>610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" extraClass={styles.button} onClick={() => setModalOpen(true)}>Оформить заказ</Button>
      </div>
      {modalOpened &&
        <Modal onClose={() => setModalOpen(false)}>
          <OrderDetails />
        </Modal>}
    </section>
  )
}

export default memo(BurgerConstructor)