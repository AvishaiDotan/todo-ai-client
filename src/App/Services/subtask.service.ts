import { httpService } from './http.service'
import { SubTask, SubTaskOrderSave } from '@/Types'

function getCompletedTasks() {
  return httpService.get<SubTask[]>(`/subtasks/completed`)
}

function createSubTask(subtask: SubTask) {
  return httpService.post<SubTask>('/subtasks', subtask)
}

function updateSubTask(subtask: SubTask) {
  return httpService.put<SubTask>(`/subtasks/${subtask.id}`, subtask)
}

function deleteSubTask(subtaskId: number) {
  return httpService.delete(`/subtasks/${subtaskId}`)
}

function saveSubtasksOrder(orderedSubtasks: SubTaskOrderSave) {
  return httpService.post(`/subtasks/orders`, orderedSubtasks)
}

export const subtaskService = {
  getCompletedTasks,
  createSubTask,
  updateSubTask,
  deleteSubTask,
  saveSubtasksOrder,
}
