import { httpService } from './http.service'

function createBoard(board: Board) {
  return httpService.post<Board>('/boards', board)
}

function getBoard(id: number) {
  return httpService.get<Board>(`/boards/${id}`)
}

function getBoardExcel(id: number) {
  return httpService.get<Board>(`/boards/${id}/excel`)
}

export const boardService = {
  createBoard,
  getBoard,
  getBoardExcel,
}
