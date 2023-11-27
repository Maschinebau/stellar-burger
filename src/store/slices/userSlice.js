import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { setCookie, handleApiResponse, axiosApi } from "../../utils/api"

export const createUser = createAsyncThunk("user/createUser", async ({ name, email, password }) => {
  const res = await axiosApi.post("auth/register", {
    email: email,
    password: password,
    name: name
  })
  const data = handleApiResponse(res)
  const expirationTime = 20 * 60 * 1000
  setCookie("accessToken", data.accessToken, expirationTime)
  localStorage.setItem("refreshToken", data.refreshToken)
  return data
})

export const loginRequest = createAsyncThunk("auth/authorization", async ({ email, password }) => {
  const res = await axiosApi.post("/auth/login", {
    email: email,
    password: password
  })
  const data = await handleApiResponse(res)
  const expirationTime = 20 * 60 * 1000
  setCookie("accessToken", data.accessToken, expirationTime)
  localStorage.setItem("refreshToken", data.refreshToken)
  return data
})

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const res = await axiosApi.get("/auth/user")
  const data = handleApiResponse(res)
  return data
})

export const changeUser = createAsyncThunk("auth/changeUser", async ({ name, email, password }) => {
  const res = await axiosApi.patch("/auth/user", {
    name: name,
    email: email,
    password: password
  })
  const data = handleApiResponse(res)
  return data
})

export const logout = createAsyncThunk("auth/logout", async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  const res = await axiosApi.post("/auth/logout", { token: refreshToken })
  const data = handleApiResponse(res)
  return data
})

export const checkAuth = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) {
    return console.log("Check-auth: User unauthorized")
  }
  try {
    await dispatch(getUser())
  } catch (error) {
    console.log("Check-auth: User unauthorized")
  }
}

export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async () => {
  const response = await axiosApi.get("/orders/all")
  const data = handleApiResponse(response)
  return data
})



const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    email: null,
    name: null,
    userOrders: []
  },
  reducers: {
    setUser(state, action) {
      state.isAuth = true
      state.email = action.payload.email
      state.name = action.payload.name
    },
    resetUser(state) {
      state.isAuth = false
      state.email = null
      state.name = null
      localStorage.removeItem("refreshToken")
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isAuth = true
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isAuth = false
      throw action.error
    })
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.isAuth = true
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isAuth = false
      console.log("Error occurred during login:", action.error)
      throw action.error
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuth = true
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isAuth = false
      throw action.error
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      userSlice.caseReducers.resetUser(state)
    })
    builder.addCase(logout.rejected, (state, action) => {
      throw action.error
    })
    builder.addCase(changeUser.rejected, (state, action) => {
      throw action.error
    })
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload.orders
    })
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      throw action.error
    })
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
