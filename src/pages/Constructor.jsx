import styles from "./pages.module.css"
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor"
import { BurgerIngredients } from "../components/burger-Ingredients/burger-Ingredients"
import { BASE_URL } from "../utils/constants"
import { useEffect, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchIngredients } from "../store/slices/ingredientsSlice"
import { DragDropContext } from "react-beautiful-dnd"
import { addToConstructor, removeFromConstructor, updateMains } from "../store/slices/constructorSlice"

export const Constructor = () => {
  const ingredients = useSelector((state) => state.ingredients.ingredients)
  const orderedIngredients = useSelector((state) => state.burgerConstructor.mains)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchIngredients(`${BASE_URL}/ingredients`))
  }, [dispatch])

  const handleDragEnd = useCallback(
    ({ draggableId, source, destination }) => {
      if (!destination) return
      const draggableIngredient = ingredients.find((item) => item.dragId === draggableId)
      const draggableOrderIngredient = orderedIngredients.find((item) => item.dragId === draggableId)

      const reorder = (list, sourceIndex, endIndex) => {
        const result = Array.from(list)
        const [removed] = result.splice(sourceIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
      }
      const reorderedOrderList = reorder(orderedIngredients, source.index, destination.index)

      if (
        (source.droppableId === "bun" || source.droppableId === "sauce" || source.droppableId === "main") &&
        (destination.droppableId === "constructor" || destination.droppableId === "constructorList")
      ) {
        dispatch(addToConstructor({ ...draggableIngredient, index: destination.index }))
      } else if (source.droppableId === "constructorList" && destination.droppableId !== "constructorList") {
        dispatch(removeFromConstructor(draggableOrderIngredient.dragId))
      } else if (source.droppableId === "constructorList" && destination.droppableId === "constructorList") {
        dispatch(updateMains(reorderedOrderList))
      }
    },
    [dispatch, ingredients, orderedIngredients]
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className={styles.constructor}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DragDropContext>
  )
}
