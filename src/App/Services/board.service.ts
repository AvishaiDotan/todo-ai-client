import { httpService } from './http.service'
import { storageService } from './storage.service'
import { utilService } from './util.service'
import { gTodos, todoService } from './todo.service'
import { gSubtasks, subtaskService } from './subtask.service'
import { Board } from '@/Types'

const BOARDS_DB_KEY = 'boards_db'
export var gBoards =
  storageService.loadFromStorage<Board[]>(BOARDS_DB_KEY) || []

async function createBoard(prompt: string) {
  const board = await httpService.post<Board>('/boards', { prompt })

  if (!utilService.isLoggedIn()) {
    const boardCopy = utilService.deepClone(board)
    gBoards.push(await _createBoardTree(boardCopy))
    storageService.saveToStorage(BOARDS_DB_KEY, gBoards)
  }

  return board
}

function createManyBoards(boards: Board[]) {
  return httpService.post<Board[]>('/boards/many', { boards })
}

function updateBoard(board: Board) {
  if (!utilService.isLoggedIn()) {
    const idx = gBoards.findIndex((b) => b.id === board.id)
    board.todos = []
    idx !== -1 && gBoards.splice(idx, 1, utilService.deepClone(board))
    storageService.saveToStorage(BOARDS_DB_KEY, gBoards)
    return Promise.resolve(board)
  }

  return httpService.put<Board>(`/boards/${board.id}`, board)
}

async function updateBoardStatus(boardId: number, status: boolean) {
  if (!utilService.isLoggedIn()) {
    const board = gBoards.find((b) => b.id === boardId)
    if (board) {
      await Promise.all(
        board.todos.map((todo) => todoService.updateTodoStatus(todo.id, status))
      )
    }

    storageService.saveToStorage(BOARDS_DB_KEY, gBoards)
    console.log('Updated')

    return Promise.resolve()
  }

  return httpService.put(`/boards/${boardId}/status`, { status })
}

function deleteBoard(boardId: number) {
  if (!utilService.isLoggedIn()) {
    const idx = gBoards.findIndex((b) => b.id === boardId)
    idx !== -1 && gBoards.splice(idx, 1)
    storageService.saveToStorage(BOARDS_DB_KEY, gBoards)
    return Promise.resolve()
  }

  return httpService.delete(`/boards/${boardId}`)
}

async function getBoards() {
  if (!utilService.isLoggedIn()) {
    const boards = await Promise.all(gBoards.map((b) => getBoard(b.id)))
    return Promise.resolve(boards.sort((a, b) => a.order - b.order))
  }

  return httpService.get<Board[]>('/boards')
}

function getBoard(id: number) {
  if (!utilService.isLoggedIn()) {
    let board = gBoards.find((b) => b.id === id)
    if (board) {
      board = utilService.deepClone(board)
      const todos = utilService.deepClone(
        gTodos.filter((t) => t.boardId === board?.id)
      )
      todos.sort((a, b) => a.order - b.order)
      todos.forEach(
        (t) => (t.subTasks = gSubtasks.filter((st) => st.todoId === t.id))
      )
      board.todos = todos
    }
    return board
      ? Promise.resolve(board)
      : Promise.reject(new Error(`Board ${id} not found`))
  }

  return httpService.get<Board>(`/boards/${id}`)
}

function saveBoardsOrder(orderedBoards: Board[]) {
  if (!utilService.isLoggedIn()) {
    if (orderedBoards.length) {
      orderedBoards.forEach((board) => {
        const idx = gBoards.findIndex((b) => b.id === board.id)
        idx !== -1 && gBoards.splice(idx, 1, utilService.deepClone(board))
      })
    }
    storageService.saveToStorage(BOARDS_DB_KEY, gBoards)
    return Promise.resolve()
  }

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
  storageService.removeFromStorage(BOARDS_DB_KEY)
}

// Private Methods

async function _createBoardTree(board: Board) {
  board.id = utilService.generateId()

  const promises = board.todos.map(async (todo) => {
    const createdTodo = await todoService.createTodo({
      ...todo,
      boardId: board.id,
      subTasks: [],
    })

    await Promise.all(
      todo.subTasks.map((st) =>
        subtaskService.createSubTask({ ...st, todoId: createdTodo.id })
      )
    )
  })

  await Promise.all(promises)
  board.todos = []

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
