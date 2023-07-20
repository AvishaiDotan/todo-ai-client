interface ITodoAICheckboxProps {
  checked: boolean
  onChange: (isChecked: boolean) => void
}

export default function TodoAICheckbox(props: ITodoAICheckboxProps) {
  return (
    <div className='checkbox-wrapper-26'>
      <input
        type='checkbox'
        id='_checkbox-26'
        checked={props.checked}
        onChange={(e) => props.onChange(e.target.checked)}
      />
      <label className='checkbox-label' htmlFor='_checkbox-26'>
        <div className='tick_mark'></div>
      </label>
    </div>
  )
}
