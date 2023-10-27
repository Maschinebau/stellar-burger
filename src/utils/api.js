import axios from "axios"
import BASE_URL from './constants'

export const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Server response was not ok")
  }
  const data = await response.json()
  return data
}

export const createUser = async (name, email, password) => {
  try {
    const response = await axios.post("https://norma.nomoreparties.space/api/auth/register", {
      email: email,
      password: password,
      name: name
    })
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
}
