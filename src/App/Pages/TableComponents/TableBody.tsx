import { DataToRender, DataToRenderTypeEnum, DataToRenderType, Board, Todo, SubTask } from "@/Types"
import { Link } from "react-router-dom"

interface ITableBodyProps {
    dataToRender: DataToRender,
    dataToRenderType: DataToRenderTypeEnum
}

export default function TableBody(props: ITableBodyProps) {
    const getPropName = (item: DataToRenderType): string => {
        if (props.dataToRenderType == DataToRenderTypeEnum.board) return (item as Board).name
        else if (props.dataToRenderType == DataToRenderTypeEnum.todo) return (item as Todo).title
        return (item as SubTask).text
    }

    const isDone = (item: DataToRenderType): boolean => {
        if (props.dataToRenderType == DataToRenderTypeEnum.board)
            return (item as Board).todos.every(t => t.subTasks.every(st => st.isDone))
        return true
    }

    const getHref = (item: DataToRenderType): string => {
        if (props.dataToRenderType == DataToRenderTypeEnum.board)
            return `${item.id}`;
        else if (props.dataToRenderType == DataToRenderTypeEnum.todo)
            return `todo/${item.id}`;
    }



    return (
        <div className="body">
            {props.dataToRender.map(i =>
                <div key={i.id} className='item grid-layout'>
                    {
                        (props.dataToRenderType !== DataToRenderTypeEnum.subTask) ? <Link to={getHref(i)}>{getPropName(i)}</Link> : <div>{getPropName(i)}</div>
                    }

                    <div>
                        {<input type='checkbox' checked={isDone(i)} onChange={() => { }}></input>}
                    </div>
                </div>)}
        </div>
    )
}
