import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
import { Board } from '@/Types'

export default function TodosPage() {
  const [boardData, setBoardData] = useState<Board | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const navigate = useNavigate()
  const { boardId } = useParams()

  useEffect(() => {
    boardId && loadContent()
  }, [])

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

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={boardData?.name} />
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
            Go back to boards
          </span>
        </div>
      </section>
    </section>
  )
}
