import { httpService } from './http.service'
import { Todo, TodoOrderSave } from '@/Types'

function getTodo(todoId: number) {
  return httpService.get<Todo>(`/todos/${todoId}`)
}

function createTodo(todo: Todo) {
  return httpService.post(`/todos/${todo.id}`, todo)
}

function updateTodo(todo: Todo) {
  return httpService.put(`/todos/${todo.id}`, todo)
}

function updateTodoStatus(todoId: number, status: boolean): Promise<any> {
  return httpService.put(`/todos/${todoId}/status`, { status })
}

function deleteTodo(todoId: number) {
  return httpService.delete(`/todos/${todoId}`)
}

function saveTodosOrder(orderedTodos: TodoOrderSave) {
  return httpService.post(`/todos/orders`, orderedTodos)
}

export const todoService = {
  getTodo,
  createTodo,
  updateTodo,
  updateTodoStatus,
  deleteTodo,
  saveTodosOrder,
}
