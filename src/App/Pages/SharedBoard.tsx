import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ReactSortable } from 'react-sortablejs'
import { debounce } from 'lodash'

import { boardService } from '@/Services/board.service'
import { subtaskService } from '@/Services/subtask.service'
import { todoService } from '@/Services/todo.service'
import { Board, SubTask, Todo } from '@/Types'

import SharedTodo from '@/Components/SharedBoard/SharedTodo'

export default function SharedBoard() {
  const { boardId } = useParams()

  const [board, setBoard] = useState<Board>()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (boardId) loadBoard(+boardId)
  }, [])

  useEffect(() => {
    board && handleSaveTodosOrder()
  }, [board])

  const loadBoard = async (id: number) => {
    try {
      setIsLoading(true)
      const board = await boardService.getBoard(id)
      setBoard(board)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubTaskChange = async (value: boolean, subtask: SubTask) => {
    try {
      const subtaskToUpdate: SubTask = {
        ...subtask,
        isDone: value,
      }

      updateSubTask(subtaskToUpdate)
      await subtaskService.updateSubTask(subtaskToUpdate)
    } catch (error) {
      updateSubTask(subtask)
    }
  }

  const updateSubTask = (subtask: SubTask) => {
    setBoard((prev) => {
      // Using map to get new instance of array
      const updatedTodos = prev!.todos.map((todo) =>
        // In case of the updated todoId matched, apply modification, otherwise return the original
        todo.id === subtask.todoId
          ? {
              ...todo, // shallow copy
              subTasks: todo.subTasks.map((task) =>
                // Return the updated "subtask" in matching "ids", otherwise return the original
                task.id === subtask.id ? subtask : task
              ),
            }
          : todo
      )

      return {
        ...prev!,
        todos: updatedTodos,
      }
    })
  }

  const handleSaveTodosOrder = debounce(async () => {
    try {
      await todoService.saveTodosOrder({
        boardId: board!.id,
        todos: board!.todos,
      })
    } catch (error) {
      console.log(error)
    }
  }, 1000)

  const handleSortableSetList = async (todos: Todo[]) => {
    setBoard((prev) => ({
      ...prev!,
      todos: todos.map((t, idx) => ({ ...t, order: idx + 1 })),
    }))
  }

  const todoList = board?.todos.map((todo) => (
    <SharedTodo
      key={todo.id}
      todo={todo}
      onSubTaskChange={handleSubTaskChange}
    />
  ))

  return (
    <div className='shared-board'>
      <h1>{board?.name}</h1>
      {board && (
        <ReactSortable
          list={board.todos}
          setList={handleSortableSetList}
          // group='groupName'
          animation={200}
          delayOnTouchOnly
          delay={2}>
          {todoList}
        </ReactSortable>
      )}
    </div>
  )
}
