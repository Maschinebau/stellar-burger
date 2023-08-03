import { IngridientItem } from '../ingridient-item/ingridient-item'
import styles from './ingridient-group.module.css'



export function IngridientGroup(props) {
  const { title, ingridients, id } = props
  
  return (
    <div id={id}>
      <h2 className={`text text_type_main-medium pb-6`}>{title}</h2>
      <ul className={styles.list} >
        {ingridients.map((item) =>
            <IngridientItem
              imageLink={item.image}
              price={item.price}
              name={item.name}
              count={''}
            />
        )}
      </ul>
    </div>
  )
}

