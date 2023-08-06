import { httpService } from './http.service'
import { storageService } from './storage.service'
import { utilService } from './util.service'
import { SubTask } from '@/Types'

const SUBTASKS_DB_KEY = 'subtasks_db'
export var gSubtasks: SubTask[] =
  storageService.loadFromStorage<SubTask[]>(SUBTASKS_DB_KEY) || []

function getCompletedTasks() {
  if (!utilService.isLoggedIn()) {
    const tasks = gSubtasks.filter((task) => task.isDone)
    return Promise.resolve(tasks)
  }

  return httpService.get<SubTask[]>(`/subtasks/completed`)
}

function createSubTask(subtask: SubTask) {
  if (!utilService.isLoggedIn()) {
    subtask.id = utilService.generateId()
    gSubtasks.push(utilService.deepClone(subtask))
    storageService.saveToStorage(SUBTASKS_DB_KEY, gSubtasks)
    return Promise.resolve(subtask)
  }

  return httpService.post<SubTask>('/subtasks', subtask)
}

function updateSubTask(subtask: SubTask) {
  if (!utilService.isLoggedIn()) {
    const idx = gSubtasks.findIndex((task) => task.id === subtask.id)
    idx !== -1 && gSubtasks.splice(idx, 1, utilService.deepClone(subtask))
    storageService.saveToStorage(SUBTASKS_DB_KEY, gSubtasks)
    return Promise.resolve(subtask)
  }

  return httpService.put<SubTask>(`/subtasks/${subtask.id}`, subtask)
}

function deleteSubTask(subtaskId: number) {
  if (!utilService.isLoggedIn()) {
    const idx = gSubtasks.findIndex((task) => task.id === subtaskId)
    idx !== -1 && gSubtasks.splice(idx, 1)
    storageService.saveToStorage(SUBTASKS_DB_KEY, gSubtasks)
    return Promise.resolve()
  }

  return httpService.delete(`/subtasks/${subtaskId}`)
}

function saveSubtasksOrder(orderedSubtasks: SubTask[]) {
  if (!utilService.isLoggedIn()) {
    if (orderedSubtasks.length) {
      orderedSubtasks.forEach((task) => {
        const idx = gSubtasks.findIndex((st) => st.id === task.id)
        idx !== -1 && gSubtasks.splice(idx, 1, utilService.deepClone(task))
      })
    }
    storageService.saveToStorage(SUBTASKS_DB_KEY, gSubtasks)
    return Promise.resolve()
  }

  return httpService.put(`/subtasks/orders`, orderedSubtasks)
}

export const subtaskService = {
  getCompletedTasks,
  createSubTask,
  updateSubTask,
  deleteSubTask,
  saveSubtasksOrder,
}
