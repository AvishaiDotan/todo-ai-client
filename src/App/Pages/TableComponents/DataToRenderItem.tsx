import { DataToRenderTypeEnum, DataToRenderType, SubTask, Board, Todo, IBoardCrudActions } from "@/Types"
import { Link } from "react-router-dom"
import { useState, useRef, useEffect, useCallback } from 'react'
import { BiPencil } from 'react-icons/bi';
import { debounce } from 'lodash'
import { log } from "console";



interface IDataToRenderItemProps {
    dataToRenderType: DataToRenderTypeEnum,
    item: DataToRenderType,
    boardCrudActions: IBoardCrudActions
}

export default function DataToRenderItem({ dataToRenderType, item, boardCrudActions: actions }: IDataToRenderItemProps) {

    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState("")

    useEffect(() => {
        if (isEditing)
            setFocus()
    }, [isEditing])


    const subTaskRef = useRef<HTMLInputElement>(null)
    const otherRef = useRef<HTMLInputElement>(null)

    const getPropName = (item: DataToRenderType): string => {
        if (dataToRenderType === DataToRenderTypeEnum.board) return (item as Board).name
        else if (dataToRenderType === DataToRenderTypeEnum.todo) return (item as Todo).title
        return (item as SubTask).text
    }

    const getHref = (item: DataToRenderType): string => {
        if (dataToRenderType === DataToRenderTypeEnum.board)
            return `${item.id}`;
        else (dataToRenderType === DataToRenderTypeEnum.todo)
        return `todo/${item.id}`;
    }

    const setEditingMode = (ev: Event) => {
        ev.stopPropagation()
        ev.preventDefault()
        setIsEditing(true)
    }

    const renameItem = (newName: string) => {
        if (dataToRenderType === DataToRenderTypeEnum.board) (item as Board).name = newName
        else if (dataToRenderType === DataToRenderTypeEnum.todo) (item as Todo).title = newName
        else (item as SubTask).text = newName

        setNewName(newName);
    }
    
    useEffect(() => {
        debouncedRenameItem(item as any)

    }, [newName])

    const getUpdateAction = (item: DataToRenderType) => {
        console.log(dataToRenderType);
        
        if (dataToRenderType === DataToRenderTypeEnum.board) return actions.onUpdateBoard(item as Board)
        else if (dataToRenderType === DataToRenderTypeEnum.todo) return actions.onUpdateTodo(item as Todo)
        return actions.onUpdateSubTask(item as SubTask)
    }
    
    const debouncedRenameItem = useCallback(debounce(getUpdateAction, 1000), [])

     

    const setViewMode = () => {
        setIsEditing(false)
    }

    const setFocus = () => {

        if (dataToRenderType === DataToRenderTypeEnum.subTask)
            subTaskRef.current?.focus()
        else {
            otherRef.current?.focus()
        }
    }




    return (
        (dataToRenderType !== DataToRenderTypeEnum.subTask) ?
            (!isEditing) ?
                <div className="data-to-render-item">
                    <Link to={getHref(item)}>
                        <div >
                            <span>
                                {getPropName(item)}
                            </span>
                        </div>
                    </Link>
                    <BiPencil onClick={setEditingMode} />
                </div>
                :
                <input 
                    ref={otherRef} 
                    className="outline-0 bg-transparent" 
                    value={getPropName(item)} 
                    onChange={(ev) => renameItem(ev.target.value)} 
                    onBlur={setViewMode} />
            :
            (!isEditing) ?
                <div className="data-to-render-item">
                    <span>
                        {getPropName(item)}
                    </span>
                    <BiPencil onClick={setEditingMode} />
                </div>
                :
                <input 
                    ref={subTaskRef} 
                    className="outline-0 bg-transparent" 
                    value={getPropName(item)} 
                    onChange={(ev) => renameItem(ev.target.value)} onBlur={setViewMode} />
    )
}
