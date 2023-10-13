import { IngredientItem } from "../ingredient-item/ingredient-item"
import styles from "./ingredient-group.module.css"
import { ingredientPropType } from "../../../utils/prop-types"
import PropTypes from "prop-types"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { forwardRef } from "react"

export const IngredientGroup = forwardRef(({ title, listItems, id }, ref) => {
  return (
    <div ref={ref}>
      <Droppable droppableId={id} type="ingredients">
        {(provided) => (
          <div id={id} ref={provided.innerRef} {...provided.droppableProps}>
            <h2 className={`text text_type_main-medium pb-6`}>{title}</h2>
            <ul className={styles.list}>
              {listItems.map((item, index) => (
                <Draggable
                  key={item.dragId}
                  draggableId={item.dragId}
                  index={index}
                  type="ingredient"
                  shouldClone={true}
                >
                  {(provided, snapshot) => (
                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                      <IngredientItem ingredient={item} />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </div>
  )
})

IngredientGroup.propTypes = {
  title: PropTypes.string,
  listItems: PropTypes.arrayOf(ingredientPropType).isRequired,
  id: PropTypes.string
}
