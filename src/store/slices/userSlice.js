import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL } from "../../utils/constants"
import axios from "axios"
import { checkResponse, setCookie, getCookie, getCookies } from "../../utils/api"

export const loginRequest = createAsyncThunk("auth/authorization", async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })

  const data = await checkResponse(response)
  const expirationTime = 20 * 60 * 1000
  setCookie("accessToken", data.accessToken, expirationTime)
  localStorage.setItem("refreshToken", data.refreshToken)
  return data
})

export const accessTokenRequest = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) return
  const response = await fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      token: refreshToken
    })
  })
  const data = await checkResponse(response)
  const expirationTime = 20 * 60 * 1000
  setCookie("accessToken", data.accessToken, expirationTime)
  localStorage.setItem("refreshToken", data.refreshToken)
  return data.success
}

export const getUser = createAsyncThunk("auth/getUsers", async () => {
  const response = await fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: getCookie("accessToken")
    }
  })
  const data = await checkResponse(response)
  return data
})

export const checkAuth = () => {
  return async (dispatch) => {
    try {
      const res = await dispatch(getUser())
      if (!res.payload.success) {
        await dispatch(accessTokenRequest())
        await dispatch(getUser())
      }
    } catch (error) {
      console.log("Check-auth: User unauthorized")
    }
  }
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    email: null,
    name: null
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
  }
})

export const { setUser, resetUser } = userSlice.actions
export default userSlice.reducer

// {
//   "success": true,
//   "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1M2E5ZDJkNTJiNGNmMDAxZDg2ZGE5MyIsImlhdCI6MTcwMDMyNTA3NCwiZXhwIjoxNzAwMzI2Mjc0fQ.tlgK90O0_mfuMUP-P-99-dvgTMUcoriAShPvdaISmDU",
//   "refreshToken": "8a860fb25e83cace8b073bfa885d5d75e34bb94226935c9a33cc1f1d7746079947eee8678e4d5490",
//   "user": {
//       "email": "saxmail72@mail.ru",
//       "name": "Axel"
//   }
// }
