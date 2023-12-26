import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"
import { TIngredient } from "../../utils/types"

type TconstructorState = {
  buns: TIngredient[]
  mains: TIngredient[]
}

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: {
    buns: [],
    mains: []
  } as TconstructorState,
  reducers: {
    addToConstructor: (state, action: PayloadAction<TIngredient>) => {
      const clonedIngredient = { ...action.payload, dragId: uuid() }
      if (clonedIngredient.type === "bun") {
        state.buns = [clonedIngredient, clonedIngredient]
      } else {
        clonedIngredient.index !== undefined
          ? state.mains.splice(clonedIngredient.index, 0, clonedIngredient)
          : console.warn("Индекс перетаскиваемого ингредиента undefined")
      }
    },
    removeFromConstructor: (state, action: PayloadAction<Pick<TIngredient, "dragId">>) => {
      state.buns = state.buns.filter((ingredient) => ingredient.dragId !== action.payload)
      state.mains = state.mains.filter((ingredient) => ingredient.dragId !== action.payload)
    },
    updateMains: (state, action: PayloadAction<TIngredient[] | []>) => {
      state.mains = action.payload
    },
    updateBuns: (state, action: PayloadAction<TIngredient[] | []>) => {
      state.buns = action.payload
    }
  }
})

export const { addToConstructor, removeFromConstructor, updateMains, updateBuns } = constructorSlice.actions
export default constructorSlice.reducer
