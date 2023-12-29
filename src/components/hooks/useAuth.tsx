import { useSelector } from "react-redux"
import { RootState } from "../../store/rootReducer"

export const useAuth = () => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth)
  const email = useSelector((state: RootState) => state.user.email)
  const name = useSelector((state: RootState) => state.user.name)

  return { isAuth, email, name }
}
