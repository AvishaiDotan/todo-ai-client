import { ThunkAction } from 'redux-thunk'

import { boardService } from '../../Services/board.service'
import { IBoardState } from '../Reducers/boards.reducer'
import { AnyAction } from 'redux'

export const ACTIONS = {
  CREATE_BOARD: 'CREATE_BOARD',
}

export function createBoard(
  prompt: string
): ThunkAction<void, IBoardState, unknown, AnyAction> {
  return async (dispatch) => {
    try {
      const board = await boardService.createBoard(prompt)
      dispatch({ type: ACTIONS.CREATE_BOARD, board })
    } catch (err) {
      console.log(err)
    }
  }
}
