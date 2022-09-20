import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm, Resolver } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAxios } from '../axios/axios'
import { useAppContext } from '../context/AppContextProvider'

type FormValues = {
  username: string
  password: string
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.password
      ? {
          username: {
            type: 'required',
            message: 'username is required',
          },
          password: {
            type: 'required',
            message: 'password is required',
          },
        }
      : {},
  }
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver })
  const navigate = useNavigate()
  const { setIsAuthenticated } = useAppContext()
  const [erorMessage, setErroMessage] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookies] = useCookies(['jwtToken'])
  const instance = useAxios()

  const login = async ({ username, password }: FormValues) => {
    try {
      const res = await instance.post('/auth/login', {
        username: username,
        password: password,
      })
      console.log(res.status)
      setCookies('jwtToken', res.data.token)
      setIsAuthenticated(true)
      navigate('/')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.response.request.status == 403) {
        setErroMessage('wrong username or passwrod')
      }
    }
  }

  const onSubmit = handleSubmit(async (data: FormValues) => {
    login(data)
  })

  return (
    <>
      <div className='flex justify-center items-center my-20'>
        <div className='card bg-base-100 shadow-xl border w-[500px] text-center py-24 p-10 space-y-10'>
          <h1 className='text-4xl font-bold'>Login</h1>
          <div>
            <form onSubmit={onSubmit}>
              <div className='flex flex-col space-y-10'>
                <div className='w-full text-left'>
                  <input
                    placeholder='username'
                    {...register('username', { required: true })}
                    className='bg-transparent w-full poll p-4'
                  />
                  {errors?.username && (
                    <p className='p-2 text-red-500'>{errors.username.message}</p>
                  )}
                </div>
                <div className='w-full text-left'>
                  <input
                    placeholder='password'
                    {...register('password', { required: true })}
                    className='bg-transparent poll p-4 w-full'
                  />
                  {errors?.password && (
                    <p className='p-2 text-red-500'>{errors.password.message}</p>
                  )}
                  {erorMessage && <p className='p-2 text-red-500'>{erorMessage}</p>}
                </div>
                <input type='submit' className='bg-primary p-4' />
              </div>
              {/* register your input into the hook by invoking the "register" function */}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
