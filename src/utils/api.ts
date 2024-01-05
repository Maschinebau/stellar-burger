import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { TUser } from "./types"

export const axiosApi = axios.create({
  baseURL: "https://norma.nomoreparties.space/api"
})

axiosApi.defaults.headers.common["Content-Type"] = "application/json"

// обновление токена авторизации
export const accessTokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) return
  try {
    const res = await axiosApi.post("/auth/token", {
      token: refreshToken
    })
    const data = await handleApiResponse(res)
    const expirationTime = 20 * 60 * 1000
    setCookie("accessToken", data.accessToken, expirationTime)
    localStorage.setItem("refreshToken", data.refreshToken)
    return data.success
  } catch (error) {
    return Promise.reject(error)
  }
}

// конфиг перехвата запроса
axiosApi.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("accessToken")
    // @ts-ignore
    config.headers = {
      Authorization: accessToken,
      Accept: "application/json",
      "Content-Type": "application/json"
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// конфиг перехвата ответа
axiosApi.interceptors.response.use(
  (response) => {
    return response
  },
  async function (error) {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true
      const accessToken = await accessTokenRefresh()
      axios.defaults.headers.common["Authorization"] = accessToken
      return axiosApi(originalRequest)
    }
    return Promise.reject(error)
  }
)

// проверяем статус ответа
export const handleApiResponse = (res: AxiosResponse) => {
  if (res.status !== 200) {
    console.log("Server response was not ok")
    throw new Error("Server response was not ok")
  }
  return res.data
}

export const sendResetMessage = async (email: TUser["email"]) => {
  const res = await axiosApi.post("/password-reset", {
    email: email
  })
  const data = handleApiResponse(res)
  if (data.success) {
    console.log(data.message)
    return true
  } else {
    return false
  }
}
export const changePassword = async (password: TUser["password"], token: string) => {
  const res = await axiosApi.post("/password-reset/reset", {
    password: password,
    token: token
  })
  const data = handleApiResponse(res)
  if (data.success) {
    return true
  } else {
    return false
  }
}

// @ts-ignore
export function setCookie(name, value, props = {}) {
  props = {
    path: "/",
    ...props
  }
  // @ts-ignore
  let exp = props.expires
  if (typeof exp == "number" && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    // @ts-ignore
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    // @ts-ignore
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + "=" + value
  for (const propName in props) {
    updatedCookie += "; " + propName
    // @ts-ignore
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += "=" + propValue
    }
  }
  document.cookie = updatedCookie
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)")
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}

export const getCookies = () => {
  const cookies = document.cookie.split(";")
  const cookieData = {}
  cookies.forEach((cookie) => {
    const [name, value] = cookie.trim().split("=")
    // @ts-ignore
    cookieData[name] = value
  })
  return cookieData
}
