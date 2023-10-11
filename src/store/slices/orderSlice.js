import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { orders_URL } from "../../utils/constants"

export const postOrder = createAsyncThunk("order/postOrder", async (ids) => {
  try {
    debugger
    const response = await fetch(orders_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ingredients: ids
      })
    })

    if (!response.ok) {
      throw new Error("Server response was not ok")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return error.message
  }
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    name: "",
    sucess: null
  },
  reducers: {
    setOrder(state, action) {
      state.orderNumber = action.payload.order.number
      state.name = action.payload.name
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postOrder.fulfilled, (state, action) => {
      state.orderNumber = action.payload.order.number
      state.name = action.payload.name
      state.sucess = action.payload.sucess
    })
  }
})

export const { setOrderNumber } = orderSlice.actions
export default orderSlice.reducer
