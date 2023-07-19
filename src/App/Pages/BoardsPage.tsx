import { useState, useEffect, useCallback } from 'react'
import { debounce } from 'lodash'
import { useImmer } from 'use-immer'

import arrow from '../../../src/App/Assets/arrow.png'
import CameraWrapper from '@/Components/HomePageStyledElements/CameraWrapper'
import TableHeaderTitle from '@/Components/TableComponents/TableHeaderTitle'
import TableHeaders from '@/Components/TableComponents/TableHeaders'
import TableBody from '@/Components/TableComponents/TableBody'
import TodoAiLoader from '@/Components/MiniComponents/TodoAiLoader'
import TodoAICheckbox from '@/Components/MiniComponents/TodoAICheckbox'

import { boardService } from '@/Services/board.service'
import { Board, DataToRenderType, DataToRenderTypeEnum } from '@/Types'

export default function BoardsPage() {
  const [boardList, setBoardList] = useImmer<Board[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      setIsLoading(true)
      const boards = await boardService.getBoards()
      setBoardList(boards)
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
    await boardService.updateBoardStatus(item.id, isDone)

    setBoardList((draft) => {
      const board2Update = draft.find((board) => board.id === item.id)
      if (board2Update) {
        board2Update.todos.forEach((todo) =>
          todo.subTasks.forEach((st) => (st.isDone = isDone))
        )
      }
    })
  }

  const handleItemTextChange = (item: DataToRenderType, newName: string) => {
    setBoardList((draft) => {
      const board2Update = draft.find((board) => board.id === item.id)
      board2Update && (board2Update.name = newName)
    })
    debouncedSaveItem({ ...item, name: newName } as Board)
  }

  const saveChanges = async (updatedItem: Board) => {
    await boardService.updateBoard(updatedItem)
  }

  const debouncedSaveItem = useCallback(debounce(saveChanges, 500), [])

  return (
    <section className='boards-page'>
      <TableHeaderTitle title={'Boards'} />
      <section className='table-wrapper'>
        <section className='table'>
          <TableHeaders />
          <div style={{ height: 'calc(100% - 60px)' }}>
            {!isLoading ? (
              <TableBody
                dataToRender={boardList}
                dataToRenderType={DataToRenderTypeEnum.board}
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
      </section>
    </section>
  )
}
