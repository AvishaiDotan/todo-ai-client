import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ImSpinner2 } from 'react-icons/im'

import { loginUser, registerUser } from '@/Store/Actions/account.actions'
import { useAppDispatch } from '@/Store'

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

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const inputs = useMemo(
    () =>
      [
        { type: 'text', name: 'firstName', label: 'First Name' },
        { type: 'text', name: 'lastName', label: 'Last Name' },
        { type: 'email', name: 'email', label: 'E-Mail' },
        { type: 'password', name: 'password', label: 'Password', minLength: 6 },
      ].slice(props.isLoginPage ? 2 : 0),
    [props.isLoginPage]
  )

  const submitBtnClasses = useMemo(
    () =>
      props.isLoginPage
        ? `bg-sky-600 hover:text-sky-600  hover:border-sky-600`
        : `bg-green-600 hover:text-green-600  hover:border-green-600`,
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
    } catch (error: any) {
      setErrorMsg(error.message)
      console.log(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='auth-page'>
      <h1>{props.isLoginPage ? 'Log-in' : 'Sign-up'}</h1>
      <form
        onSubmit={handleSubmit}
        className='w-full md:w-1/2 flex flex-col gap-3'>
        {inputs.map((inp) => (
          <React.Fragment key={inp.name}>
            <label htmlFor={`${inp.name}-input`}>{inp.label}</label>
            <input
              {...inp}
              required
              id={`${inp.name}-input`}
              value={formInputs[inp.name]}
              onChange={handleChange}
              className='w-full px-5 py-2 transition focus:outline-none focus:border-sky-600 border border-2 border-emerald-900 rounded hover:border-sky-500'
            />
          </React.Fragment>
        ))}

        <p
          className={`transition duration-500 px-2 py-3 bg-red-300 border border-red-400 text-red-600 rounded ${
            errorMsg ? 'opacity-100' : 'opacity-0'
          }`}>
          {errorMsg}
        </p>

        <button
          type='submit'
          disabled={isSubmitting}
          className={`shadow rounded-full text-white px-3 py-2 text-lg transition duration-300 hover:bg-white border border-2 ${submitBtnClasses}`}>
          {submitText}
        </button>
      </form>
    </div>
  )
}
