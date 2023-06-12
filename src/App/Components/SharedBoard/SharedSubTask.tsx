interface ISharedSubTaskProps {
  subtask: SubTask
  onChange: (value: boolean, subtask: SubTask) => void
}

export default function SharedSubTask(props: ISharedSubTaskProps) {
  return (
    <span className={`shared-subtask ${props.subtask.isDone ? 'done' : ''}`}>
      <input
        id={`checkbox-${props.subtask.id}`}
        type='checkbox'
        checked={props.subtask.isDone}
        onChange={(e) => props.onChange(e.target.checked, props.subtask)}
      />
      <label htmlFor={`checkbox-${props.subtask.id}`}>
        {props.subtask.text}
      </label>
    </span>
  )
}
