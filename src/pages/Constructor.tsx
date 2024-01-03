import styles from "./pages.module.css"
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor"
import { BurgerIngredients } from "../components/burger-Ingredients/burger-Ingredients"
import { useCallback } from "react"
import { DragDropContext, DropResult } from "react-beautiful-dnd"
import { addToConstructor, removeFromConstructor, updateMains } from "../store/slices/constructorSlice"
import { TIngredient } from "../utils/types"
import { useAppDispatch } from "../components/hooks/useAppDispatch"
import { useAppSelector } from "../components/hooks/useAppSelector"

type TReorder = {
  list: TIngredient[]
  sourceIndex: number
  endIndex: number
}

export const Constructor = () => {
  const ingredients = useAppSelector((state) => state.ingredients.ingredients)
  const orderedIngredients = useAppSelector((state) => state.burgerConstructor.mains)
  const dispatch = useAppDispatch()

  // рассчеты при окончании перетаскивания ингредиента
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      const { draggableId, source, destination } = result
      if (!destination) return

      const draggableIngredient = ingredients.find((item) => item.dragId === draggableId) as TIngredient
      const draggableOrderIngredient = orderedIngredients.find(
        (item) => item.dragId === draggableId
      ) as TIngredient

      // алгоритм перетасовки индексов
      const reorder = ({ list, sourceIndex, endIndex }: TReorder) => {
        const result = Array.from(list)
        const [removed] = result.splice(sourceIndex, 1)
        result.splice(endIndex, 0, removed)
        return result
      }
      // формируем новый порядок после перетаскивания
      const reorderedOrderList = reorder({
        list: orderedIngredients,
        sourceIndex: source.index,
        endIndex: destination.index
      })

      if (
        (source.droppableId === "bun" || source.droppableId === "sauce" || source.droppableId === "main") &&
        (destination.droppableId === "constructor" || destination.droppableId === "constructorList")
      ) {
        dispatch(addToConstructor({ ...draggableIngredient, index: destination.index }))
      } else if (source.droppableId === "constructorList" && destination.droppableId !== "constructorList") {
        dispatch(removeFromConstructor(draggableOrderIngredient?.dragId))
      } else if (source.droppableId === "constructorList" && destination.droppableId === "constructorList") {
        dispatch(updateMains(reorderedOrderList))
      }
    },
    [dispatch, ingredients, orderedIngredients]
  )

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <main className={styles.constructormain}>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </DragDropContext>
  )
}
