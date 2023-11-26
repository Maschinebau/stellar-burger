import { useEffect } from "react"
import { useSelector } from "react-redux"

export const useAuth = () => {
  const isAuth = useSelector((state) => state.user.isAuth)
  const email = useSelector((state) => state.user.email)
  const name = useSelector((state) => state.user.name)

  return { isAuth, email, name }
}
