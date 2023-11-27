import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosApi, handleApiResponse } from "../../utils/api"

export const getOrders = createAsyncThunk("allOrders/getOrders", async () => {
  const response = await axiosApi.get("/orders/all")
  const data = await handleApiResponse(response)
  return data
})

const allOrdersSlice = createSlice({
  name: "allOrders",
  initialState: {
    orders: [],
    total: null,
    totalToday: null,
    error: null,
  },
  reducers: {
    clearOrders(state, action) {
      state.orders = []
      state.total = null
      state.totalToday = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload.orders
        state.total = action.payload.total
        state.totalToday = action.payload.totalToday
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const { clearOrders } = allOrdersSlice.actions
export default allOrdersSlice.reducer

// {
//   "success": true,
//   "orders": [
//     {
//       "ingredients": [
//         "60d3463f7034a000269f45e7",
//         "60d3463f7034a000269f45e9",
//         "60d3463f7034a000269f45e8",
//         "60d3463f7034a000269f45ea"
//       ],
//       "_id": "",
//       "status": "done",
//       "number": 0,
//       "createdAt": "2021-06-23T14:43:22.587Z",
//       "updatedAt": "2021-06-23T14:43:22.603Z"
//     }
//   ],
//   "total": 1,
//   "totalToday": 1
// }
