import React from 'react'
import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        {inputs.map((inp) => (
          <React.Fragment key={inp.name}>
            <label htmlFor={`${inp.name}-input`}>{inp.label}</label>
            <input
              {...inp}
              required
              id={`${inp.name}-input`}
              value={formInputs[inp.name]}
              onChange={handleChange}
              className='w-full px-5 py-2 transition focus:outline-5 outline outline-2 outline-emerald-900 rounded'
            />
          </React.Fragment>
        ))}

        <button
          type='submit'
          className='shadow rounded-full bg-green-600 text-white px-3 py-2 text-lg'>
          {props.isLoginPage ? 'Login' : 'Create an account'}
        </button>
      </form>
    </div>
  )
}
