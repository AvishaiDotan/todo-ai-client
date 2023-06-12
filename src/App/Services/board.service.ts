import { httpService } from './http.service'

function createBoard(prompt: string) {
  return httpService.post<Board>('/boards', { prompt })
}

function getBoards() {
  return httpService.get<Board[]>('/boards')
}

function getBoard(id: number) {
  return httpService.get<Board>(`/boards/${id}`)
}

function getBoardExcel(id: number) {
  return httpService.get<Board>(`/boards/${id}/excel`)
}

export const boardService = {
  createBoard,
  getBoards,
  getBoard,
  getBoardExcel,
}
