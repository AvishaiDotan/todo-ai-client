interface ISharedSubTaskProps {
  subtask: SubTask
  onChange: (value: boolean, subtask: SubTask) => void
}

export default function SharedSubTask(props: ISharedSubTaskProps) {
  return (
    <span className='shared-subtask'>
      <input
        type='checkbox'
        checked={props.subtask.isDone}
        onChange={(e) => props.onChange(e.target.checked, props.subtask)}
      />
      <span>{props.subtask.text}</span>
    </span>
  )
}
