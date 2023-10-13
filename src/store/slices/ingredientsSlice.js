import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { data } from "../../utils/data"
import { checkResponse } from "../../utils/constants"
import { v4 as uuid } from "uuid"

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async (url) => {
  const response = await fetch(url)
  const result = await checkResponse(response)
  return result.data
})

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    loading: false,
    error: null
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload)
    },
    removeIngredient: (state, action) => {
      return state.filter((ingredient) => ingredient._id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false
        state.ingredients = action.payload.map((ingredient) => ({ ...ingredient, dragId: uuid() }))
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
        state.ingredients = data
      })
  }
})

export const { addIngredient, removeIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer
