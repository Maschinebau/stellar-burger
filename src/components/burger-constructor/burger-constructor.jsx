import React, { useEffect, useState } from "react"
import styles from './burger-constructor.module.css'
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerComponent } from './burger-component/burger-component'
import { ModalPortal } from '../modal-portal/modal-portal'
import { OrderAccept } from '../modals/order-accept'
import { data } from '../../utils/data'

export function BurgerConstructor() {
  const [ modalOpened, setModalOpen ] = useState(false)
  const mains = data.filter((item) => item.type !== 'bun')
  const buns = data.filter((item) => item.type === 'bun')

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
        <Button htmlType="button" type="primary" size="medium" style={{ cursor: 'pointer' }} onClick={() => setModalOpen(true)}>Оформить заказ</Button>
      </div>
      {modalOpened &&
        <ModalPortal onOverlay={() => setModalOpen(false)}>
          <OrderAccept onClose={() => setModalOpen(false)} />
        </ModalPortal>}
    </section>
  )
}

// export default function App() {
//   const [modalOn, setModalOn] = useState(false);
//   return (
//     <div className="App">
//       <button id="button" onClick={() => setModalOn((prev) => !prev)}>
//         Show Modal
//       </button>
//       <div id="big-text">This is an example of modal using react portals.</div>
//       {modalOn && (
//         <PortalForModal dismiss={setModalOn}
//          //everything inside this will be rendered inside portal at center of screen.
//          >

//           <p style={{ textAlign: "center", margin: "1rem" }}>
//             This modal is rendered on a dom node outside the current root node.
//           </p>
//           <p style={{ textAlign: "center", margin: "1rem" }}>
//             You can click the below button or area outside this modal to close
//             it.
//           </p>
//           <button
//             onClick={() => {
//               setModalOn((prev) => !prev);
//             }}
//           >
//             Close Modal
//           </button>
//         </PortalForModal>
//       )}
//     </div>
//   );
// }