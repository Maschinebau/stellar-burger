import { createSlice } from "@reduxjs/toolkit"

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: null
  },
  reducers: {
    setCurrentIngredient(state, action) {
      state.currentIngredient = action.payload
    }
  }
})

export const { setCurrentIngredient } = currentIngredientSlice.actions
export default currentIngredientSlice.reducer
