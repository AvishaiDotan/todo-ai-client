import { DataToRenderTypeEnum, DataToRenderType, SubTask, Board, Todo } from "@/Types"
import { Link } from "react-router-dom"
import { useState, useRef, useEffect } from 'react'
import { BiPencil } from 'react-icons/bi';




interface IDataToRenderItemProps {
    dataToRenderType: DataToRenderTypeEnum,
    item: DataToRenderType,
}

export default function DataToRenderItem({ dataToRenderType, item }: IDataToRenderItemProps) {

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

    const setEditingMode = (ev: Event) =>  {
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

    const setViewMode = () => {
        setIsEditing(false)
    }

    const setFocus = () => {
        
        if (dataToRenderType === DataToRenderTypeEnum.subTask) 
            subTaskRef.current?.focus()
        else{
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
                    <BiPencil onClick={setEditingMode}/>
                </div>
                :
                <input ref={otherRef} className="outline-0 bg-transparent" value={getPropName(item)} onChange={(ev) => renameItem(ev.target.value)} onBlur={setViewMode}/> 
                :
                (!isEditing) ?
                    <div className="data-to-render-item">
                        <span>
                            {getPropName(item)}
                        </span>
                        <BiPencil onClick={setEditingMode} />
                    </div> 
                    :
                    <input ref={subTaskRef} className="outline-0 bg-transparent" value={getPropName(item)} onChange={(ev) => renameItem(ev.target.value)} onBlur={setViewMode}/>  
    )
}
