interface BaseEntity {
  id: number
}

interface Board extends BaseEntity {
  name: string
  todos: Todo[]
}

interface Todo extends BaseEntity {
  title: string
  subTasks: SubTask[]
  boardId: number
  order: number
}

type TodoOrderSave = {
  boardId: number
  todos: Pick<Todo, 'id' | 'order'>[]
}

interface SubTask extends BaseEntity {
  text: string
  isDone: boolean
  todoId: number
}

interface ILoginCredentials {
  email: string
  password: string
}

interface IUser extends BaseEntity {
  email: string
  fullName: string
}

interface ILoginResult {
  user: IUser
  token: string
}
