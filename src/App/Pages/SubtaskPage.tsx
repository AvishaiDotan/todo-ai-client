import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { debounce } from 'lodash'
import { useImmer } from 'use-immer'

import arrow from '../../../src/App/Assets/arrow.png'
import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import TableHeaderTitle from '@/Components/TableComponents/TableHeaderTitle'
import TableHeaders from '@/Components/TableComponents/TableHeaders'
import TableBody from '@/Components/TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import { todoService } from '@/Services/todo.service'
import { DataToRenderType, DataToRenderTypeEnum, SubTask, Todo } from '@/Types'
import { subtaskService } from '@/Services/subtask.service'

export default function SubtaskPage() {
  const [todoData, setTodoData] = useImmer<Todo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { todoId } = useParams()

  useEffect(() => {
    todoId && loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const todoData = await todoService.getTodo(+todoId!)
      setTodoData(todoData)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleItemStatusChange = async (
    item: DataToRenderType,
    isDone: boolean
  ) => {
    await subtaskService.updateSubTask({ ...item, isDone } as SubTask)

    setTodoData((draft) => {
      const item2Update = draft?.subTasks.find((st) => st.id === item.id)
      item2Update && (item2Update.isDone = isDone)
    })
  }

  const handleItemTextChange = (item: DataToRenderType, newText: string) => {
    setTodoData((draft) => {
      const item2Update = draft?.subTasks.find((st) => st.id === item.id)
      item2Update && (item2Update.text = newText)
    })

    debouncedSaveItem({ ...(item as SubTask), text: newText })
  }

  const saveChanges = async (updatedItem: SubTask) => {
    await subtaskService.updateSubTask(updatedItem)
  }

  const debouncedSaveItem = useCallback(debounce(saveChanges, 500), [])

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={todoData?.title} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ height: 'calc(100% - 60px)' }}>
            {!isLoading && todoData ? (
              <TableBody
                dataToRender={todoData.subTasks}
                dataToRenderType={DataToRenderTypeEnum.subTask}
                onItemStatusChange={handleItemStatusChange}
                onItemTextChange={handleItemTextChange}
              />
            ) : (
              <TodoAiLoader />
            )}
          </div>
        </section>
      </section>

      <section className='actions-wrapper'>
        <div className='apply-status-to-all-wrapper'>
          <CameraWrapper isFromHomePage={false}>
            <div className='apply-status-to-all-container'>
              <h4 className='third-font-family'>Status:</h4>
              <TodoAICheckbox />
              <div className='checkbox-arrow-wrapper'>
                <img src={arrow} />
              </div>
            </div>
          </CameraWrapper>
        </div>

        <div className='description'></div>

        <div className='pb-[60px] flex justify-end w-full'>
          <span
            className='underline cursor-pointer'
            onClick={() => navigate(-1)}>
            Go back to Todos Page
          </span>
        </div>
      </section>
    </section>
  )
}
