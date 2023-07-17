import {
  DataToRender,
  DataToRenderTypeEnum,
  DataToRenderType,
  Board,
  Todo,
  SubTask,
  IBoardCrudActions,
} from '@/Types'
import DataToRenderItem from './DataToRenderItem'

interface ITableBodyProps {
  dataToRender: DataToRender
  dataToRenderType: DataToRenderTypeEnum
  boardCrudActions: IBoardCrudActions
}

export default function TableBody(props: ITableBodyProps) {
  const isDone = (item: DataToRenderType): boolean => {
    if (props.dataToRenderType == DataToRenderTypeEnum.board)
      return (item as Board)?.todos?.every((t) =>
        t.subTasks.every((st) => st.isDone)
      )
    else if (props.dataToRenderType == DataToRenderTypeEnum.todo)
      return (item as Todo)?.subTasks?.every((st) => st.isDone)
    else return (item as SubTask).isDone
  }

  return (
    <div className='body'>
      {props.dataToRender.map((i) => (
        <div key={i.id} className='item grid-layout'>
          {
            <DataToRenderItem
              boardCrudActions={props.boardCrudActions}
              item={i}
              dataToRenderType={props.dataToRenderType}
            />
          }

          <div>
            {
              <input
                type='checkbox'
                checked={isDone(i)}
                onChange={() => {}}></input>
            }
          </div>
        </div>
      ))}
    </div>
  )
}
