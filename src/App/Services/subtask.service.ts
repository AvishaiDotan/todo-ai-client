import { httpService } from './http.service'

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

export const subtaskService = {
  getCompletedTasks,
  createSubTask,
  updateSubTask,
  deleteSubTask,
}
