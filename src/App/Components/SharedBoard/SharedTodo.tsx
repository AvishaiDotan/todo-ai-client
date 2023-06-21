import { useState } from 'react'
import { RxDragHandleDots2 as DragIcon } from 'react-icons/rx'
import {
  TbCirclePlus as PlusIcon,
  TbCircleMinus as MinusIcon,
} from 'react-icons/tb'

import SharedSubTask from './SharedSubTask'
import { SubTask, Todo } from '@/Types'

interface ISharedTodoProps {
  todo: Todo
  onSubTaskChange: (value: boolean, subtask: SubTask) => void
}

export default function SharedTodo(props: ISharedTodoProps) {
  const [isOpen, setIsOpen] = useState(true)

  const subTaskList = props.todo.subTasks.map((task) => (
    <li key={task.id}>
      <SharedSubTask subtask={task} onChange={props.onSubTaskChange} />
    </li>
  ))

  return (
    <div className='shared-todo' data-id={props.todo.id}>
      <div className='flex flex-row items-center gap-1'>
        <DragIcon className='hidden md:inline cursor-grab transition hover:text-gray-300 todo-list-icon' />
        {isOpen ? (
          <MinusIcon
            className='cursor-pointer transition hover:text-gray-300 todo-list-icon'
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <PlusIcon
            className='cursor-pointer transition hover:text-gray-300 todo-list-icon'
            onClick={() => setIsOpen(true)}
          />
        )}
        <h3 className='title'>{props.todo.title}</h3>
      </div>
      <ul className={`shared-todo-list ${isOpen ? 'opened' : ''}`}>
        {subTaskList}
      </ul>
    </div>
  )
}
