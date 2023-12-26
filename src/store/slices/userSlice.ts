import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setCookie, handleApiResponse, axiosApi } from "../../utils/api"
import { TOrder, TUser } from "../../utils/types"
import { Dispatch } from "redux"

export const createUser = createAsyncThunk("user/createUser", async ({ name, email, password }: TUser) => {
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

export const loginRequest = createAsyncThunk("auth/authorization", async ({ email, password }: TUser) => {
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

export const changeUser = createAsyncThunk("auth/changeUser", async ({ name, email, password }: TUser) => {
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

export const checkAuth = () => async (dispatch: Dispatch) => {
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

type TUserState = {
  isAuth: boolean
  email: string | null
  name: string | null
  userOrders: TOrder[]
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    email: null,
    name: null,
    userOrders: []
  } as TUserState,
  reducers: {
    setUser(state, action: PayloadAction<Omit<TUserState, 'userOrders'>>) {
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
      console.log(action.error.message)
    })
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      state.isAuth = true
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })
    builder.addCase(loginRequest.rejected, (state, action) => {
      state.isAuth = false
      console.log("Error occurred during login:", action.error)
      console.log(action.error.message)
    })
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isAuth = true
      state.email = action.payload.user.email
      state.name = action.payload.user.name
    })
    builder.addCase(getUser.rejected, (state, action) => {
      state.isAuth = false
      console.log(action.error.message)
    })
    builder.addCase(logout.fulfilled, (state, action) => {
      userSlice.caseReducers.resetUser(state)
    })
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.error.message)
    })
    builder.addCase(changeUser.rejected, (state, action) => {
      console.log(action.error.message)
    })
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload.orders
    })
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      console.log(action.error.message)
    })
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer
