import { httpService } from './http.service'
import { TodoOrderSave } from '@/Types'

function saveTodosOrder(todoOrders: TodoOrderSave) {
  return httpService.post(`/todos/orders`, todoOrders)
}

export const todoService = {
  saveTodosOrder,
}
