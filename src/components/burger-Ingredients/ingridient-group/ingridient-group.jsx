import { IngridientItem } from '../ingridient-item/ingridient-item'
import styles from './ingridient-group.module.css'
import PropTypes from "prop-types"


export function IngridientGroup(props) {
  const { title, listItems, id } = props
  
  return (
    <div id={id}>
      <h2 className={`text text_type_main-medium pb-6`}>{title}</h2>
      <ul className={styles.list} >
        {listItems.map((item) =>
            <IngridientItem
              imageLink={item.image}
              price={item.price}
              name={item.name}
              count={0}
              key={item._id}
              calories={item.calories}
              proteins={item.proteins}
              fat={item.fat}
              carbohydrates={item.carbohydrates}
              imageLarge={item.image_large}
            />
        )}
      </ul>
    </div>
  )
}

IngridientGroup.propTypes = {
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