import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'

import { loginUser, registerUser } from '@/Store/Actions/account.actions'
import { useAppDispatch } from '@/Store'
import { boardService, gBoards } from '@/Services/board.service'
import { IRegisterPayload } from '@/Types'

interface IAuthPageProps {
  isLoginPage: boolean
}

interface FormInputs extends IRegisterPayload {
  [key: string]: any
}

export default function AuthPage(props: IAuthPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [formInputs, setFormInputs] = useState<FormInputs>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    setErrorMsg('')
  }, [props.isLoginPage])

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const inputs = useMemo(
    () =>
      [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',
          placeholder: 'Type your first name',
        },
        {
          type: 'text',
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Type your last name',
        },
        {
          type: 'email',
          name: 'email',
          label: 'E-Mail',
          placeholder: 'Type your email address',
        },
        {
          type: 'password',
          name: 'password',
          label: 'Password',
          minLength: 6,
          placeholder: 'Type your password',
        },
      ].slice(props.isLoginPage ? 2 : 0),
    [props.isLoginPage]
  )

  const submitBtnClasses = useMemo(
    () => (props.isLoginPage ? 'border-secondary login' : 'border-primary'),
    [props.isLoginPage]
  )

  const submitText = useMemo(() => {
    if (isSubmitting)
      return (
        <ImSpinner2 className='inline w-8 h-8 mr-2 animate-spin fill-white-600' />
      )
    return props.isLoginPage ? 'Login' : 'Create an account'
  }, [props.isLoginPage, isSubmitting])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormInputs((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg('')

    const storeAction = props.isLoginPage ? loginUser : registerUser
    try {
      await dispatch(storeAction(formInputs))
      navigate('/home')

      if (gBoards.length) await boardService.createManyBoards(gBoards)
    } catch (error: any) {
      setErrorMsg(error.message)
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='auth-page'>
      <form
        onSubmit={handleSubmit}
        className='w-full md:w-1/2 xl:w-1/3 2xl:w-1/4 flex flex-col gap-3'>
        <h1
          className={`p-2 text-white font-bold text-center text-2xl w-full ${
            props.isLoginPage ? 'bg-secondary' : 'bg-primary'
          }`}>
          {props.isLoginPage ? 'Log-in' : 'Sign-up'}
        </h1>
        {inputs.map((inp) => (
          <React.Fragment key={inp.name}>
            <label htmlFor={`${inp.name}-input`}>{inp.label}</label>
            <input
              {...inp}
              required
              id={`${inp.name}-input`}
              value={formInputs[inp.name]}
              onChange={handleChange}
              className='w-full px-5 py-2 transition focus:outline-none border-b focus:border-sky-500 rounded'
            />
          </React.Fragment>
        ))}

        {props.isLoginPage ? (
          <p className='text-gray-500'>
            Don't you have an account?{' '}
            <Link to={'/signup'} className='text-sky-500'>
              Signup
            </Link>
          </p>
        ) : (
          <p className='text-gray-500'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-sky-500'>
              Login
            </Link>
          </p>
        )}

        <p
          className={`transition duration-500 px-2 py-3 bg-red-300 border border-red-400 text-red-600 rounded ${
            errorMsg ? 'opacity-100' : 'opacity-0'
          }`}>
          {errorMsg}
        </p>

        <button
          type='submit'
          disabled={isSubmitting}
          className={`submit-auth-btn rounded-full px-3 py-2 text-lg border border-2 ${submitBtnClasses}`}>
          {submitText}
        </button>
      </form>
    </div>
  )
}
