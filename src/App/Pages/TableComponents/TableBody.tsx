import { DataToRender, DataToRenderTypeEnum, DataToRenderType, Board } from "@/Types"

interface ITableBodyProps {
    dataToRender: DataToRender,
    dataToRenderType: DataToRenderTypeEnum
}

export default function TableBody(props: ITableBodyProps) {
    const getPropName = (item: DataToRenderType): string => {
        if (props.dataToRenderType == DataToRenderTypeEnum.board) return (item as Board).name
        return ""
    }

	const isDone = (item: DataToRenderType): boolean => {
        if (props.dataToRenderType == DataToRenderTypeEnum.board)
		    return (item as Board).todos.every(t => t.subTasks.every(st => st.isDone))
        return true
	}

    return (
        <div className="body">
            {props.dataToRender.map(i =>
                <div className='item grid-layout'>
                    <div>
                        {getPropName(i)}
                    </div>
                    <div>
                        {<input type='checkbox' checked={isDone(i)}></input>}
                    </div>
                </div>)}
        </div>
    )
}
