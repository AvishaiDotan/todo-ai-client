import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

// to avoid annoying error with dispatch function on typescript
import type {} from 'redux-thunk/extend-redux'

import { IAccountState, accountReducer } from './Reducers/account.reducer'
import { IBoardState, boardsReducer } from './Reducers/boards.reducer'

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export interface IAppState {
  account: IAccountState
  boards: IBoardState
}

const rootReducer = combineReducers<IAppState>({
  boards: boardsReducer,
  account: accountReducer,
})

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
