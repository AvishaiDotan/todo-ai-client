import { useState, useEffect } from 'react'

import arrow from '../../../src/App/Assets/arrow.png'
import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import TableHeaderTitle from '@/Components/TableComponents/TableHeaderTitle'
import TableHeaders from '@/Components/TableComponents/TableHeaders'
import TableBody from '@/Components/TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import { boardService } from '@/Services/board.service'
import { Board } from '@/Types'

export default function BoardsPage() {
  const [boards, setBoards] = useState<Board[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const boards = await boardService.getBoards()
      setBoards(boards)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExcelDownload = async (boardId: number, fileName: string) => {
    try {
      setIsDownloading(true)
      await boardService.downloadBoardExcel(boardId, fileName)
    } catch (error) {
      console.log('Failed to download', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={'Boards'} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ height: 'calc(100% - 60px)' }}>
            {!isLoading ? (
              <span>TODO: RenderTable</span>
            ) : (
              // <TableBody
              //   boardCrudActions={boardCrudActions}
              //   dataToRender={boards}
              //   dataToRenderType={dataToRenderType}
              // />
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
      </section>
    </section>
  )
}
