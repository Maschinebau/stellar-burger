import axios from "axios"
import BASE_URL from "./constants"

export const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Server response was not ok")
  }
  const data = await response.json()
  return data
}

export const handleApiResponse = (response) => {
  if (!response.ok) {
    console.log("Server response was not ok")
    throw new Error("Server response was not ok")
  }
  return response.data
}

export const createUser = async (name, email, password) => {
  try {
    const response = await axios.post("https://norma.nomoreparties.space/api/auth/register", {
      email: email,
      password: password,
      name: name
    })
    const data = handleApiResponse(response)
    console.log(data)
  } catch (error) {
    console.error('Error during registration', error)
  }
}

export const sendResetMessage = async (email) => {
  try {
    const response = await axios.post("https://norma.nomoreparties.space/api/password-reset", {
      email: email
    })
    const data = handleApiResponse(response)
    if (data.success) {
      console.log(data.message)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error('Error when sending an email', error)
    return false
  }
}

export const changePassword = async (password, token) => {
  try {
    const response = await axios.post("https://norma.nomoreparties.space/api/password-reset/reset", {
      password: password,
      token: token
    })
    const data = handleApiResponse(response)
    if (data.success) {
      console.log(data.message)
      return true
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
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