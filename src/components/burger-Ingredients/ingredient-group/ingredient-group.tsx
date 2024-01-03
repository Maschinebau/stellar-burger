import React, { forwardRef, Ref } from "react";
import { Droppable, Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { TIngredient } from "../../../utils/types";
import { IngredientItem } from "../ingredient-item/ingredient-item";
import styles from "./ingredient-group.module.css";

interface IIngredientGroupProps {
  id: string
  title: string
  listItems: TIngredient[]
}

export const IngredientGroup = forwardRef(
  ({ title, listItems, id }: IIngredientGroupProps, ref: Ref<HTMLDivElement>) => {
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
                    draggableId={item.dragId ?? ''}
                    index={index}
                  >
                    {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
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
  }
)
