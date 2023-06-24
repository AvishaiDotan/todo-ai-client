import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import { boardService } from '@/Services/board.service'
import { DataToRenderTypeEnum, DataToRender } from '../Types'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import arrow from '../../../src/App/Assets/arrow.png'
import TableHeaderTitle from './TableComponents/TableHeaderTitle'
import TableHeaders from './TableComponents/TableHeaders'
import TableBody from './TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'
import DownloadBtn from '@/Components/MiniComponents/DownloadBtn'

type ComponentParams = {
  boardId?: string
  todoId?: string
}

interface IBoardsProps {
  title: string
  dataToRenderType: DataToRenderTypeEnum
}

export default function Boards({ title, dataToRenderType }: IBoardsProps) {
  const [dataToRender, setDataToRender] = useState<DataToRender>([])
  const [isDownloading, setIsDownloading] = useState(false)
  const params = useParams<ComponentParams>()

  const navigate = useNavigate()

  useEffect(() => {
    loadContent()
  }, [params])

  const loadContent = async () => {
    let content: DataToRender = await boardService.getBoards()

    const { boardId, todoId } = params

    if (todoId && boardId) {
      const board = content.find((b) => b.id === +boardId)
      const todo = board?.todos.find((t) => t.id === +todoId)
      todo && setDataToRender(todo.subTasks)
    } else if (
      !boardId &&
      !todoId &&
      dataToRenderType == DataToRenderTypeEnum.board
    ) {
      setDataToRender(content)
    } else if (boardId && !todoId) {
      const board = content.find((b) => b.id === +boardId)
      board && setDataToRender(board.todos)
    }
  }

  const isSingleBoardPage = params.boardId && !params?.todoId

  const handleExcelDownload = async () => {
    try {
      setIsDownloading(true)

      // Convert result to Blob
      const binaryData = await boardService.getBoardExcel(+params.boardId!)
      const reader = new FileReader()
      const blob = new Blob([binaryData], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      // Prepare a link to download
      const elDownload = document.createElement('a')
      elDownload.setAttribute('download', `Board-${params.boardId}.xlsx`)

      // Start readAsDataURL then set it to the download link url and make a click
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        elDownload.href = reader.result as string
        elDownload.click()

        setIsDownloading(false)
      }
    } catch (error) {
      console.log('Failed to download', error)
      setIsDownloading(false)
    }
  }

  const getBackLabel = useCallback(() => {
    switch (dataToRenderType) {
      case DataToRenderTypeEnum.todo:
        return 'Back to Boards Page'
      case DataToRenderTypeEnum.subTask:
        return 'Back to Todos Page'

      default:
        return ''
    }
  }, [dataToRenderType])

  return (
    <section className='boards-page'>
      <TableHeaderTitle headerStr={title} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ height: 'calc(100% - 60px)' }}>
            {dataToRender.length ? (
              <TableBody
                dataToRender={dataToRender}
                dataToRenderType={dataToRenderType}
              />
            ) : (
              <TodoAiLoader />
            )}
          </div>
        </section>
      </section>

      <section className='actions-wrapper'>
        <div className='apply-status-to-all-wrapper w-full'>
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

        {isSingleBoardPage && (
          <DownloadBtn
            loading={isDownloading}
            onClick={handleExcelDownload}
            text='Download Excel'
          />
        )}

        <div className='description'></div>

        <div className='pb-[60px] flex justify-end w-full'>
          <span className='underline cursor-pointer' onClick={() => navigate(-1)}>
            {getBackLabel()}
          </span>
        </div>

        {/* {(props.isBoards) && <div>Back to Boards Page</div>} */}
      </section>
    </section>
  )
}
