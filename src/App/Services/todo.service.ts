import { httpService } from './http.service'

function saveTodosOrder(todoOrders: TodoOrderSave) {
  return httpService.post(`/todos/orders`, todoOrders)
}

export const todoService = {
  saveTodosOrder,
}
