interface BaseEntity {
  id: number
}

export interface Board extends BaseEntity {
  name: string
  todos: Todo[]
}

export interface Todo extends BaseEntity {
  title: string
  subTasks: SubTask[]
  boardId: number
  order: number
}

type TodoOrderSave = {
  boardId: number
  todos: Pick<Todo, 'id' | 'order'>[]
}

export interface SubTask extends BaseEntity {
  text: string
  isDone: boolean
  todoId: number
}

interface IUser extends BaseEntity {
  email: string
  fullName: string
}

interface IRegisterPayload extends Omit<IUser, 'id' | 'fullName'> {
  firstName: string
  lastName: string
  password: string
}

interface ILoginCredentials {
  email: string
  password: string
}

interface ILoginResult {
  user: IUser
  token: string
}
export enum PageRoute {
  home = "home",
  boards = "boards",
  todos = "todos",
  completed = "completed",
  shared = "shared"
}

export type DataToRender = Board[] | Todo[] | SubTask[]
export type DataToRenderType = Board | Todo | SubTask
export enum DataToRenderTypeEnum {
  board = "board",
  todo = "todo",
  subTask = "subTask"
}
