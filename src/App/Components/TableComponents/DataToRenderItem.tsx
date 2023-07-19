import { useState, useRef, useEffect, MouseEvent } from 'react'
import {
  DataToRenderTypeEnum,
  DataToRenderType,
  SubTask,
  Board,
  Todo,
} from '@/Types'
import { Link } from 'react-router-dom'
import { BiPencil, BiTrash } from 'react-icons/bi'

interface IDataToRenderItemProps {
  item: DataToRenderType
  dataToRenderType: DataToRenderTypeEnum
  onTextChange: (item: DataToRenderType, newText: string) => void
  onItemRemove: (itemId: number) => void
}

export default function DataToRenderItem({
  dataToRenderType,
  item,
  onTextChange,
  onItemRemove,
}: IDataToRenderItemProps) {
  const [isEditMode, setEditMode] = useState(false)

  useEffect(() => {
    if (isEditMode) setFocus()
  }, [isEditMode])

  const subTaskRef = useRef<HTMLInputElement>(null)
  const otherRef = useRef<HTMLInputElement>(null)

  const getItemText = (item: DataToRenderType): string => {
    if (dataToRenderType === DataToRenderTypeEnum.board)
      return (item as Board).name
    else if (dataToRenderType === DataToRenderTypeEnum.todo)
      return (item as Todo).title
    return (item as SubTask).text
  }

  const getHref = (item: DataToRenderType): string => {
    // Using relative paths
    if (dataToRenderType === DataToRenderTypeEnum.board) return `${item.id}`
    else if (dataToRenderType === DataToRenderTypeEnum.todo)
      return `subtasks/${item.id}`
    else return ''
  }

  const handleTextChange = (item: DataToRenderType, newText: string) =>
    onTextChange(item, newText)

  const setFocus = () => {
    if (dataToRenderType === DataToRenderTypeEnum.subTask)
      subTaskRef.current?.focus()
    else {
      otherRef.current?.focus()
    }
  }

  const setEditingMode = (e: MouseEvent) => {
    e.preventDefault()
    setEditMode(true)
  }

  const itemContent = (
    <div className='data-to-render-item'>
      <div>
        <input
          ref={otherRef}
          className='outline-0 bg-transparent'
          value={getItemText(item)}
          onChange={(e) => handleTextChange(item, e.target.value)}
          onBlur={() => setEditMode(false)}
        />
      </div>
      <div className='text-xl'>
        <span onClick={setEditingMode}>
          <BiPencil className='text-orange-400' />
        </span>
        <span onClick={() => onItemRemove(item.id)}>
          <BiTrash className='text-red-400' />
        </span>
      </div>
    </div>
  )

  return dataToRenderType !== DataToRenderTypeEnum.subTask ? (
    <Link to={getHref(item)}>{itemContent}</Link>
  ) : (
    <>{itemContent}</>
  )
}
