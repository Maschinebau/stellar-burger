import { useAppSelector } from "./useAppSelector"

export const useAuth = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth)
  const email = useAppSelector((state) => state.user.email)
  const name = useAppSelector((state) => state.user.name)

  return { isAuth, email, name }
}
