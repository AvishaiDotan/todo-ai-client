import { ACTIONS } from '../Actions/boards.actions'
import { Board } from '@/Types'

export interface IBoardState {
  boards: Board[]
}

const initialState: IBoardState = {
  boards: [],
}

export function boardsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.board],
      }

    case ACTIONS.ADD_LOCAL_BOARDS:
      return {
        ...state,
        boards: [...state.boards, ...action.boards],
      }

    default:
      return state
  }
}
