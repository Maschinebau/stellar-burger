import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuid } from "uuid"

const constructorSlice = createSlice({
  name: "burgerConstructor",
  initialState: {
    buns: [],
    mains: []
  },
  reducers: {
    addToConstructor: (state, action) => {
      const clonedIngredient = { ...action.payload, dragId: uuid() }
      if (clonedIngredient.type === "bun") {
        state.buns = [clonedIngredient, clonedIngredient]
      } else {
        state.mains.splice(clonedIngredient.index, 0, clonedIngredient)
      }
    },
    removeFromConstructor: (state, action) => {
      state.buns = state.buns.filter((ingredient) => ingredient.dragId !== action.payload)
      state.mains = state.mains.filter((ingredient) => ingredient.dragId !== action.payload)
    },
    updateConstructor: (state, action) => {
      state.mains = action.payload
    }
  }
})

export const { addToConstructor, removeFromConstructor, updateConstructor } = constructorSlice.actions
export default constructorSlice.reducer
