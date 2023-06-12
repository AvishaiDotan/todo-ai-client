import { useMemo } from 'react'

interface IBoardCreatorInputProps {
  isActive: boolean
  onActiveChange: (active: boolean) => void
  value: string
  onValueChange: (value: string) => void
  onSubmit: () => void
}

function BoardCreatorInput(props: IBoardCreatorInputProps) {
  const activeClass = useMemo(() => {
    return props.isActive ? 'active' : ''
  }, [props.isActive])

  return (
    <>
      <div
        className={`board-backdrop ${activeClass}`}
        onClick={() => props.onActiveChange(false)}></div>

      <div className={`board-input-wrapper ${activeClass}`}>
        <input
          className='board-input'
          type='text'
          onChange={(e) => props.onValueChange(e.target.value)}
          onClick={() => props.onActiveChange(true)}
          value={props.value}
          placeholder='What do you need to do?'
        />

        <button type='button' onClick={props.onSubmit}>
          Submit
        </button>
      </div>
    </>
  )
}

export default BoardCreatorInput
