import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { data } from "../../utils/data"
import { checkResponse } from "../../utils/api"
import { v4 as uuid } from "uuid"
import { TIngredient } from "../../utils/types"

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async (url: string) => {
  const response = await fetch(url)
  const result = await checkResponse(response)
  return result.data
})

type TIngredientsState = {
  ingredients: TIngredient[]
  loading: boolean
  error: string | null | undefined
}

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    loading: false,
    error: null
  } as TIngredientsState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push(action.payload)
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter((ingredient) => ingredient._id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action: PayloadAction<TIngredient[]>) => {
        state.loading = false
        state.ingredients = action.payload.map((ingredient) => ({ ...ingredient, dragId: uuid() }))
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.ingredients = data.map((ingredient) => ({ ...ingredient, dragId: uuid() }))
      })
  }
})

export const { addIngredient, removeIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer
