import { ChangeEvent, useCallback } from 'react'
import { ReactSortable, Sortable, Store } from 'react-sortablejs'
import {
  DataToRender,
  DataToRenderTypeEnum,
  DataToRenderType,
  Board,
  Todo,
  SubTask,
} from '@/Types'
import DataToRenderItem from './DataToRenderItem'

interface ITableBodyProps {
  dataToRender: DataToRender
  dataToRenderType: DataToRenderTypeEnum
  onItemStatusChange: (item: DataToRenderType, isDone: boolean) => void
  onItemTextChange: (item: DataToRenderType, newText: string) => void
  onItemRemove: (itemId: number) => void
  onDownloadExcel?: (itemId: number, fileName: string) => void
  onItemsOrderChange:
    | ((
        newState: DataToRender,
        sortable: Sortable | null,
        store: Store
      ) => void)
    | undefined
}

export default function TableBody(props: ITableBodyProps) {
  const isDone = useCallback((item: DataToRenderType): boolean => {
    if (props.dataToRenderType === DataToRenderTypeEnum.board) {
      return (item as Board)?.todos?.every((t) =>
        t.subTasks.every((st) => st.isDone)
      )
    } else if (props.dataToRenderType === DataToRenderTypeEnum.todo) {
      return (item as Todo)?.subTasks?.every((st) => st.isDone)
    } else {
      return (item as SubTask).isDone
    }
  }, [])

  const handleStatusChange = (
    e: ChangeEvent<HTMLInputElement>,
    item: DataToRenderType
  ) => props.onItemStatusChange(item, e.target.checked)

  const itemList = props.dataToRender.map((dataItem) => (
    <div key={dataItem.id} className='item grid-layout'>
      {
        <DataToRenderItem
          item={dataItem}
          dataToRenderType={props.dataToRenderType}
          onTextChange={props.onItemTextChange}
          onItemRemove={props.onItemRemove}
          onDownloadExcel={props.onDownloadExcel}
        />
      }

      <div>
        {
          <input
            type='checkbox'
            checked={isDone(dataItem)}
            onChange={(e) => handleStatusChange(e, dataItem)}></input>
        }
      </div>
    </div>
  ))

  return (
    <div className='body'>
      <ReactSortable
        list={(props.dataToRender as any) || []}
        setList={props.onItemsOrderChange}
        animation={200}
        delayOnTouchOnly
        delay={2}>
        {itemList}
      </ReactSortable>
    </div>
  )
}
