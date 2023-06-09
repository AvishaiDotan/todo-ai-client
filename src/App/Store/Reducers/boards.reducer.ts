import { ACTIONS } from '../Actions/boards.actions'

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
        boards: [
          ...state.boards,
          action.board
        ],
      }

    default:
      return state
  }
}
