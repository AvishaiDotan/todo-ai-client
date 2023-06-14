import { useMemo } from 'react'
import { ImSpinner9 } from 'react-icons/im'

interface IBoardCreatorInputProps {
  isLoading: boolean
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
        onClick={() => !props.isLoading && props.onActiveChange(false)}></div>

      <div className={`board-input-wrapper ${activeClass}`}>
        <input
          disabled={props.isLoading}
          className='board-input'
          type='text'
          onChange={(e) => props.onValueChange(e.target.value)}
          onClick={() => props.onActiveChange(true)}
          value={props.value}
          placeholder='What do you need to do?'
        />

        <button
          className='submit-btn'
          type='button'
          onClick={props.onSubmit}
          disabled={props.isLoading}>
          {props.isLoading ? (
            <ImSpinner9 className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
          ) : (
            <span>Submit</span>
          )}
        </button>
      </div>
    </>
  )
}

export default BoardCreatorInput
