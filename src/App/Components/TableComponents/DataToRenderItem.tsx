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
import { RxDragHandleDots2 as DragIcon } from 'react-icons/rx'
import { BsDownload } from 'react-icons/bs'

interface IDataToRenderItemProps {
  item: DataToRenderType
  dataToRenderType: DataToRenderTypeEnum
  onTextChange: (item: DataToRenderType, newText: string) => void
  onItemRemove: (itemId: number) => void
  onDownloadExcel?: (itemId: number, fileName: string) => void
}

export default function DataToRenderItem({
  dataToRenderType,
  item,
  onTextChange,
  onItemRemove,
  onDownloadExcel,
}: IDataToRenderItemProps) {
  const [isEditMode, setEditMode] = useState(false)

  useEffect(() => {
    if (isEditMode) setFocus()
  }, [isEditMode])

  const editInputRef = useRef<HTMLInputElement>(null)

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
    editInputRef.current?.focus()
  }

  const setEditingMode = (e: MouseEvent) => {
    e.preventDefault()
    setEditMode(true)
  }

  const editInput = (
    <input
      ref={editInputRef}
      className='outline-0 bg-transparent cursor-pointer w-full'
      value={getItemText(item)}
      onChange={(e) => handleTextChange(item, e.target.value)}
      onBlur={() => setEditMode(false)}
    />
  )

  const handleExcelDownload = () =>
    onDownloadExcel && onDownloadExcel(item.id, (item as Board).name)
  return (
    <div className='data-to-render-item'>
      <div className='text-2xl text-slate-400 hover:text-slate-600'>
        <DragIcon className='cursor-grab active:cursor-grabbing' />
      </div>
      {dataToRenderType !== DataToRenderTypeEnum.subTask ? (
        <Link to={getHref(item)} className='flex-grow'>
          {editInput}
        </Link>
      ) : (
        <div className='flex-grow'>{editInput}</div>
      )}
      <div className='flex gap-3 text-xl'>
        <span onClick={setEditingMode}>
          <BiPencil className='text-orange-400 hover:text-orange-600' />
        </span>
        <span onClick={() => onItemRemove(item.id)}>
          <BiTrash className='text-red-400 hover:text-red-600' />
        </span>
        {dataToRenderType === DataToRenderTypeEnum.board && (
          <span title='Download excel file' onClick={handleExcelDownload}>
            <BsDownload className='text-slate-600 hover:text-slate-900' />
          </span>
        )}
      </div>
    </div>
  )
}
