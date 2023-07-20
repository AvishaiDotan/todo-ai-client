import { httpService } from './http.service'
import { storageService } from './storage.service'
import { utilService } from './util.service'
import { Board } from '@/Types'

const LOCAL_BOARDS_DB = 'boards_DB'
export var gBoards =
  storageService.loadFromStorage<Board[]>(LOCAL_BOARDS_DB) || []

const ID_GENERATOR_KEY = 'lastIdGenerator'
let idGenerator = storageService.loadFromStorage<number>(ID_GENERATOR_KEY) || 1

function createBoard(prompt: string) {
  return httpService.post<Board>('/boards', { prompt }).then((board) => {
    if (!utilService.isLoggedIn()) {
      const boardCopy = utilService.deepClone(board)
      gBoards.push(_getBoardWithId(boardCopy))
      storageService.saveToStorage(LOCAL_BOARDS_DB, gBoards)
    }

    return board
  })
}

function createManyBoards(boards: Board[]) {
  return httpService.post<Board[]>('/boards/many', { boards })
}

function updateBoard(board: Board) {
  return httpService.put<Board>(`/boards/${board.id}`, board)
}

function updateBoardStatus(boardId: number, status: boolean) {
  return httpService.put(`/boards/${boardId}/status`, { status })
}

function deleteBoard(boardId: number) {
  return httpService.delete(`/boards/${boardId}`)
}

function getBoards() {
  if (!utilService.isLoggedIn()) return Promise.resolve(gBoards)

  return httpService.get<Board[]>('/boards')
}

function getBoard(id: number) {
  if (!utilService.isLoggedIn()) {
    const board = gBoards.find((b) => b.id === id)
    return board
      ? Promise.resolve(board)
      : Promise.reject(new Error(`Board ${id} not found`))
  }

  return httpService.get<Board>(`/boards/${id}`)
}

function saveBoardsOrder(orderedBoards: Board[]) {
  return httpService.put(`/boards/orders`, orderedBoards)
}

async function downloadBoardExcel(boardId: number, fileName: string) {
  if (!utilService.isLoggedIn()) throw new Error('You must be logged in')

  const binaryData = await httpService.get<string>(
    `/boards/${boardId}/excel`,
    null,
    {
      responseType: 'arraybuffer',
    }
  )

  // Convert result to Blob
  const reader = new FileReader()
  const blob = new Blob([binaryData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  // Prepare a link to download
  const elDownload = document.createElement('a')
  elDownload.setAttribute('download', `${fileName}.xlsx`)

  // Start readAsDataURL then set it to the download link url and make a click
  reader.readAsDataURL(blob)
  reader.onloadend = function () {
    elDownload.href = reader.result as string
    elDownload.click()
  }
}

function clearLocalDb() {
  gBoards = []
  storageService.removeFromStorage(LOCAL_BOARDS_DB)
}

// Private Methods

function _getBoardWithId(board: Board) {
  board.id = idGenerator++
  board.todos = board.todos.map((todo) => {
    const todoId = idGenerator++

    return {
      ...todo,
      id: todoId,
      boardId: board.id,
      subTasks: todo.subTasks.map((task) => ({
        ...task,
        id: idGenerator++,
        todoId,
      })),
    }
  })

  storageService.saveToStorage(ID_GENERATOR_KEY, idGenerator)
  return board
}

export const boardService = {
  createBoard,
  createManyBoards,
  getBoards,
  getBoard,
  downloadBoardExcel,
  clearLocalDb,
  updateBoard,
  updateBoardStatus,
  deleteBoard,
  saveBoardsOrder,
}
