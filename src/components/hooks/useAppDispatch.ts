import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/rootReducer";
import { AnyAction } from "redux";


export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export const useAppDispatch = () => useDispatch<AppThunkDispatch>()

