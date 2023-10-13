export const BASE_URL = "https://norma.nomoreparties.space/api"
export const checkResponse = async (response) => {
  if (!response.ok) {
    throw new Error("Server response was not ok")
  }
  const data = await response.json()
  return data
}
