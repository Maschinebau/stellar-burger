import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { axiosApi, handleApiResponse } from "../../utils/api"
import { TOrder } from "../../utils/types"
import { AxiosResponse } from "axios"

export const getOrders = createAsyncThunk("allOrders/getOrders", async () => {
  const response: AxiosResponse<TAllOrdersState> = await axiosApi.get("/orders/all")
  const data: TAllOrdersState = await handleApiResponse(response)
  return data
})

type TAllOrdersState = {
  success: boolean
  orders: TOrder[] | []
  total: number | null
  totalToday: number | null
  error?: string | null
}

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
    total: null,
    totalToday: null,
    error: null,
    success: false
  } as TAllOrdersState,
  reducers: {
    clearOrders(state) {
      state.orders = []
      state.total = null
      state.totalToday = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<TAllOrdersState>) => {
        state.orders = action.payload.orders
        state.total = action.payload.total
        state.totalToday = action.payload.totalToday
        state.success = action.payload.success
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { clearOrders } = allOrdersSlice.actions
export default allOrdersSlice.reducer