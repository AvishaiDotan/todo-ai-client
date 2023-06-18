import { FormEvent, useMemo } from 'react'
import { ImSpinner9 } from 'react-icons/im'
import { FaPlay } from 'react-icons/fa'

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <>
      <div
        className={`board-backdrop ${activeClass}`}
        onClick={() => !props.isLoading && props.onActiveChange(false)}></div>

      <form
        className={`board-input-wrapper ${activeClass}`}
        onSubmit={handleSubmit}>
        <input
          type='text'
          required
          disabled={props.isLoading}
          className='board-input'
          value={props.value}
          onChange={(e) => props.onValueChange(e.target.value)}
          onClick={() => props.onActiveChange(true)}
          placeholder='What do you need to do?'
        />

        <button type='submit' className='submit-btn' disabled={props.isLoading}>
          {props.isLoading ? (
            <ImSpinner9 className='w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600' />
          ) : (
            <FaPlay className='text-[32px] text-primary' />
          )}
        </button>
      </form>
    </>
  )
}

export default BoardCreatorInput
