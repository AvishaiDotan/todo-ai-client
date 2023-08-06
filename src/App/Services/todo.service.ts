import { httpService } from './http.service'
import { storageService } from './storage.service'
import { utilService } from './util.service'
import { gSubtasks, subtaskService } from './subtask.service'
import { Todo } from '@/Types'

const TODOS_DB_KEY = 'todos_db'
export var gTodos: Todo[] =
  storageService.loadFromStorage<Todo[]>(TODOS_DB_KEY) || []

function getTodo(todoId: number) {
  if (!utilService.isLoggedIn()) {
    const todo = gTodos.find((todo) => todo.id === todoId)
    todo &&
      (todo.subTasks = gSubtasks.filter((task) => task.todoId === todo.id))

    todo && todo.subTasks.sort((a, b) => a.order - b.order)
    return todo ? Promise.resolve(todo) : Promise.reject('Not found')
  }

  return httpService.get<Todo>(`/todos/${todoId}`)
}

function createTodo(todo: Todo): Promise<Todo> {
  if (!utilService.isLoggedIn()) {
    todo.id = utilService.generateId()
    gTodos.push(utilService.deepClone(todo))
    storageService.saveToStorage(TODOS_DB_KEY, gTodos)
    return Promise.resolve(todo)
  }

  return httpService.post(`/todos/${todo.id}`, todo)
}

function updateTodo(todo: Todo) {
  if (!utilService.isLoggedIn()) {
    const idx = gTodos.findIndex((t) => t.id === todo.id)
    idx !== -1 && gTodos.splice(idx, 1, utilService.deepClone(todo))
    storageService.saveToStorage(TODOS_DB_KEY, gTodos)
    return Promise.resolve(todo)
  }

  return httpService.put(`/todos/${todo.id}`, todo)
}

async function updateTodoStatus(todoId: number, status: boolean): Promise<any> {
  if (!utilService.isLoggedIn()) {
    const todo = gTodos.find((t) => t.id === todoId)
    if (todo) {
      await Promise.all(
        todo.subTasks.map((st) =>
          subtaskService.updateSubTask({ ...st, isDone: status })
        )
      )
    }

    storageService.saveToStorage(TODOS_DB_KEY, gTodos)
    return Promise.resolve(todo)
  }

  return httpService.put(`/todos/${todoId}/status`, { status })
}

function deleteTodo(todoId: number) {
  if (!utilService.isLoggedIn()) {
    const idx = gTodos.findIndex((t) => t.id === todoId)
    idx !== -1 && gTodos.splice(idx, 1)
    storageService.saveToStorage(TODOS_DB_KEY, gTodos)
    return Promise.resolve()
  }

  return httpService.delete(`/todos/${todoId}`)
}

function saveTodosOrder(orderedTodos: Todo[]) {
  if (!utilService.isLoggedIn()) {
    if (orderedTodos.length) {
      orderedTodos.forEach((todo) => {
        const idx = gTodos.findIndex((t) => t.id === todo.id)
        idx !== -1 && gTodos.splice(idx, 1, utilService.deepClone(todo))
      })
    }
    storageService.saveToStorage(TODOS_DB_KEY, gTodos)
    return Promise.resolve()
  }

  return httpService.put(`/todos/orders`, orderedTodos)
}

export const todoService = {
  getTodo,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  saveTodosOrder,
}
