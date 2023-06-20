import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

import { boardService } from '@/Services/board.service'
import { IAppState } from '@/Store'

export const ACTIONS = {
  CREATE_BOARD: 'CREATE_BOARD',
  ADD_LOCAL_BOARDS: 'ADD_LOCAL_BOARDS',
}

export function createBoard(
  prompt: string
): ThunkAction<void, IAppState, unknown, AnyAction> {
  return async (dispatch) => {
    const board = await boardService.createBoard(prompt)
    dispatch({ type: ACTIONS.CREATE_BOARD, board })
  }
}

export function createManyBoards(
  boards: Board[]
): ThunkAction<void, IAppState, unknown, AnyAction> {
  return async (dispatch) => {
    const boards2Set = await boardService.createManyBoards(boards)
    dispatch({ type: ACTIONS.ADD_LOCAL_BOARDS, boards: boards2Set })
    boardService.clearLocalDb()
  }
}
