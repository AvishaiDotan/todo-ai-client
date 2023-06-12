import { useState } from 'react'

import SharedSubTask from './SharedSubTask'

interface ISharedTodoProps {
  todo: Todo
  onSubTaskChange: (value: boolean, subtask: SubTask) => void
  onTodoStatusChange: (isDone: boolean, todo: Todo) => void
}

export default function SharedTodo(props: ISharedTodoProps) {
  const [isOpen, setIsOpen] = useState(true)

  const subTaskList = props.todo.subTasks.map((task) => (
    <li key={task.id}>
      <SharedSubTask subtask={task} onChange={props.onSubTaskChange} />
    </li>
  ))

  return (
    <div className='shared-todo' onClick={() => setIsOpen((prev) => !prev)}>
      <h3>{props.todo.title}</h3>
      <ul className={`shared-todo-list ${isOpen ? 'open' : ''}`}>
        {subTaskList}
      </ul>
    </div>
  )
}
