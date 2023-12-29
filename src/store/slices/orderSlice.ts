import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import { axiosApi, handleApiResponse } from "../../utils/api"
import { TIngredient, TOrder } from "../../utils/types"

type TOrderState = {
  orderNumber: number | null
  name: string | null
  success: boolean | null
}

export type TOrderResponse = {
  readonly success: boolean
  readonly name: string
  readonly order: TOrder
}

export const postOrder = createAsyncThunk("order/postOrder", async (ids: Array<TIngredient["_id"]>) => {
  const res = await axiosApi.post(`${BASE_URL}/orders`, {
    ingredients: ids
  })
  const data = await handleApiResponse(res)
  return data
})

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderNumber: null,
    name: null,
    success: null
  } as TOrderState,
  reducers: {
    setOrder(state, action: PayloadAction<TOrderResponse>) {
      state.orderNumber = action.payload.order.number
      state.name = action.payload.name
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrder.fulfilled, (state, action: PayloadAction<TOrderResponse>) => {
        state.orderNumber = action.payload.order.number
        state.name = action.payload.name
        state.success = action.payload.success
      })
      .addCase(postOrder.rejected, (state, action) => {
        console.log(action.error.message)
      })
  }
})

export const { setOrder } = orderSlice.actions
export default orderSlice.reducer
