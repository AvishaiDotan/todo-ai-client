import { ACTIONS } from '../Actions/account.actions'

export interface IAccountState {
  loggedUser: IUser | null
}

const initialState: IAccountState = {
  loggedUser: null,
}

export function accountReducer(
  state = initialState,
  action: any
): IAccountState {
  switch (action.type) {
    case ACTIONS.SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.user,
      }

    default:
      return state
  }
}
