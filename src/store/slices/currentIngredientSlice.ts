import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TIngredient } from "../../utils/types"

type TCurrentIngredientState = {
  currentIngredient: TIngredient | null
}

const currentIngredientSlice = createSlice({
  name: "currentIngredient",
  initialState: {
    currentIngredient: null
  } as TCurrentIngredientState,
  reducers: {
    setCurrentIngredient(state, action: PayloadAction<TIngredient>) {
      state.currentIngredient = action.payload
    }
  }
})

export const { setCurrentIngredient } = currentIngredientSlice.actions
export default currentIngredientSlice.reducer
