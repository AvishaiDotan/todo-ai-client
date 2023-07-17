import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import arrow from '../../../src/App/Assets/arrow.png'
import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import TableHeaderTitle from '@/Components/TableComponents/TableHeaderTitle'
import TableHeaders from '@/Components/TableComponents/TableHeaders'
import TableBody from '@/Components/TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import { todoService } from '@/Services/todo.service'
import { Todo } from '@/Types'

export default function SubtaskPage() {
  const [todoData, setTodoData] = useState<Todo | null>(null)
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

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={todoData?.title} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ height: 'calc(100% - 60px)' }}>
            {!isLoading ? (
              <span>TODO: RenderTable</span>
            ) : (
              //   <TableBody
              //     boardCrudActions={boardCrudActions}
              //     dataToRender={boardData}
              //     dataToRenderType={dataToRenderType}
              //   />
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
            Go back to todos
          </span>
        </div>
      </section>
    </section>
  )
}
