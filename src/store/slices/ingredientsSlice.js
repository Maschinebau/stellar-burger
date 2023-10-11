import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { data } from "../../utils/data"
import { v4 as uuid } from "uuid"

export const fetchIngredients = createAsyncThunk("ingredients/fetchIngredients", async (url) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Server response was not ok")
    }
    const result = await response.json()
    return result.data
  } catch (error) {
    console.error("Error in obtaining ingredients, the data is taken from the local storage", error)
    return data
  }
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
      })
  }
})

export const { addIngredient, removeIngredient } = ingredientsSlice.actions
export default ingredientsSlice.reducer
