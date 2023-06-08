interface BaseEntity {
  id?: number
}

interface Board extends BaseEntity {
  name: string
  todos: Todo[]
}

interface Todo extends BaseEntity {
  title: string
  subTasks: SubTask[]
  boardId: number
}

interface SubTask extends BaseEntity {
  text: string
  isDone: boolean
  todoId: number
}
