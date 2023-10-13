import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import { checkResponse } from "../../utils/constants"

export const postOrder = createAsyncThunk("order/postOrder", async (ids) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ingredients: ids
    })
  });
  const data = await checkResponse(response);
  return data;
});

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
    builder
      .addCase(postOrder.fulfilled, (state, action) => {
        state.orderNumber = action.payload.order.number
        state.name = action.payload.name
        state.sucess = action.payload.sucess
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer
