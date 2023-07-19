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
import DownloadBtn from '@/Components/MiniComponents/DownloadBtn'

import { boardService } from '@/Services/board.service'
import { todoService } from '@/Services/todo.service'
import {
  Board,
  DataToRender,
  DataToRenderType,
  DataToRenderTypeEnum,
  Todo,
} from '@/Types'

export default function TodosPage() {
  const [boardData, setBoardData] = useImmer<Board | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const navigate = useNavigate()
  const { boardId } = useParams()

  useEffect(() => {
    boardId && loadContent()
  }, [])

  useEffect(() => {
    boardData?.todos && handleSaveTodosOrder()
  }, [boardData?.todos])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const boardData = await boardService.getBoard(+boardId!)
      setBoardData(boardData)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveTodosOrder = useCallback(
    debounce(async () => {
      boardData &&
        (await todoService.saveTodosOrder({
          boardId: boardData.id,
          todos: boardData.todos,
        }))
    }, 1000),
    []
  )

  const handleSortableSetList = async (todos: DataToRender) => {
    setBoardData((draft) => {
      const orderedTodos = todos.map<Todo>(
        (todo, idx) => ({ ...todo, order: idx + 1 } as Todo)
      )
      draft && (draft.todos = orderedTodos)
    })
  }

  const handleExcelDownload = async () => {
    try {
      setIsDownloading(true)
      await boardService.downloadBoardExcel(+boardId!, boardData!.name)
    } catch (error) {
      console.log('Failed to download', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleTodoStatusChange = async (
    item: DataToRenderType,
    isDone: boolean
  ) => {
    await todoService.updateTodoStatus(item.id, isDone)
    setBoardData((draft) => {
      const todo2Update = draft?.todos.find((todo) => todo.id === item.id)
      todo2Update && todo2Update.subTasks.forEach((st) => (st.isDone = isDone))
    })
  }

  const handleTodoTitleChange = (item: DataToRenderType, newText: string) => {
    setBoardData((draft) => {
      const todo2Update = draft?.todos.find((todo) => todo.id === item.id)
      todo2Update && (todo2Update.title = newText)
    })

    debouncedSaveItem({ ...item, title: newText } as Todo)
  }

  const saveChanges = async (updatedItem: Todo) => {
    await todoService.updateTodo(updatedItem)
  }

  const handleTodoRemove = async (todoId: number) => {
    await todoService.deleteTodo(todoId)

    setBoardData((draft) => {
      const idx = draft?.todos.findIndex((todo) => todo.id === todoId)
      idx !== -1 && draft?.todos.splice(idx!, 1)
    })
  }

  const debouncedSaveItem = useCallback(debounce(saveChanges, 500), [])

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={boardData?.name + ' Board'} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ minHeight: 'calc(100% - 60px)' }}>
            {!isLoading && boardData ? (
              <TableBody
                dataToRender={boardData.todos}
                dataToRenderType={DataToRenderTypeEnum.todo}
                onItemStatusChange={handleTodoStatusChange}
                onItemTextChange={handleTodoTitleChange}
                onItemRemove={handleTodoRemove}
                onItemsOrderChange={handleSortableSetList}
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

        {
          <DownloadBtn
            loading={isDownloading}
            onClick={handleExcelDownload}
            text='Download Excel'
          />
        }

        <div className='pb-[60px] flex justify-end w-full'>
          <span
            className='underline cursor-pointer'
            onClick={() => navigate(-1)}>
            Go back to Boards Page
          </span>
        </div>
      </section>
    </section>
  )
}
