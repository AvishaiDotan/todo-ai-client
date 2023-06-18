import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { boardService } from '../../Services/board.service'
import { IBoardState } from '../Reducers/boards.reducer'

export const ACTIONS = {
  CREATE_BOARD: 'CREATE_BOARD',
}

export function createBoard(
  prompt: string
): ThunkAction<void, IBoardState, unknown, AnyAction> {
  return async (dispatch) => {
    const board = await boardService.createBoard(prompt)
    dispatch({ type: ACTIONS.CREATE_BOARD, board })
  }
}
