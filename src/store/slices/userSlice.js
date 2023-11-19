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
  setCookie("refreshToken", data.refreshToken, 1)
  return data
})

export const refreshTokenRequest = createAsyncThunk("auth/refreshToken", async () => {
  const refreshToken = getCookie("refreshToken")
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
  console.log(data)
  return data
})

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
    builder.addCase(refreshTokenRequest.fulfilled, (state, action) => {
      state.isAuth = true
    })
    builder.addCase(refreshTokenRequest.rejected, (state, action) => {
      state.isAuth = false
      console.log("Error occurred during token refresh:", action.error)
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
