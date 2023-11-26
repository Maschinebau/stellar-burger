import axios from "axios"

export const axiosApi = axios.create({
  baseURL: "https://norma.nomoreparties.space/api",
  refresh_token_url: "https://norma.nomoreparties.space/api/auth/token",
})

axiosApi.defaults.headers.common["Content-Type"] = "application/json";

export const accessTokenRefresh = async () => {
  const refreshToken = localStorage.getItem("refreshToken")
  if (!refreshToken) return
  try {
    const res = await axiosApi.post(axiosApi.defaults.refresh_token_url, {
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

axiosApi.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie("accessToken")
    config.headers = {
      Authorization: accessToken,
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

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

export const checkResponse = async (res) => {
  if (!res.ok) {
    throw new Error("Server response was not ok")
  }
  const data = await res.json()
  return data
}

export const handleApiResponse = (res) => {
  if (res.status !== 200) {
    console.log("Server response was not ok")
    throw new Error("Server response was not ok")
  }
  return res.data
}

export const sendResetMessage = async (email) => {
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
export const changePassword = async (password, token) => {
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

export function setCookie(name, value, props = {}) {
  props = {
    path: "/",
    ...props
  }
  let exp = props.expires
  if (typeof exp == "number" && exp) {
    const d = new Date()
    d.setTime(d.getTime() + exp * 1000)
    exp = props.expires = d
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString()
  }
  value = encodeURIComponent(value)
  let updatedCookie = name + "=" + value
  for (const propName in props) {
    updatedCookie += "; " + propName
    const propValue = props[propName]
    if (propValue !== true) {
      updatedCookie += "=" + propValue
    }
  }
  document.cookie = updatedCookie
}

export function getCookie(name) {
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
    cookieData[name] = value
  })
  return cookieData
}
