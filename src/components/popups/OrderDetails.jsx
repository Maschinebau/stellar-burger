import styles from './popups.module.css'

export function OrderDetails() {

  return (
    <div className={styles.wrapper}>
      <p className="text text_type_digits-large mt-20 mb-8">034536</p>
      <h2 className="text text_type_main-medium pb-15">идентификатор заказа</h2>
      <div className={`${styles.checkmark} mb-15`}></div>
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pb-20">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}