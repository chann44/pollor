/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAxios } from '../axios/axios'

enum GenderEnum {
  female = 'female',
  male = 'male',
  other = 'other',
}

interface IFormInput {
  email: string
  bio: string
  age: string
  gender: GenderEnum
  Topics: number[] | null
}

interface TabProp {
  name: string
  id: number
  setTopics: any
}

const Tab = ({ name, id, setTopics }: TabProp) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div key={id} className='tab'>
      <button
        onClick={(e) => {
          e.stopPropagation()
          console.log(name)
          setIsActive(true)
          setTopics((prv: number[]) => [...prv, id])
        }}
        className={(isActive ? ' text-primary  font-bold ' : '') + ' px-4 py-1  '}
      >
        {name}
      </button>
    </div>
  )
}

const CreateProfile = () => {
  const { register, handleSubmit } = useForm<IFormInput>()
  const [catagories, setCatagories] = useState<any>()
  const instance = useAxios()
  const [topics, setTopics] = useState<number[] | null>([])
  const navigate = useNavigate()
  const getAllCatagores = async () => {
    const res = await instance.get('/poll/dropit')
    setCatagories(res.data)
    console.log('catagories', res.data)
  }

  useEffect(() => {
    getAllCatagores()
  }, [])

  const onSubmit = async (data: IFormInput) => {
    data = { ...data, Topics: topics }
    try {
      const res = await instance.post('/c', {
        ...data,
      })
      console.log(res)
      navigate('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <div className='space-y-10  p-6'>
        <h1 className='text-4xl'>create profile</h1>
        <div className='w-full max-w-lg'>
          <form className='space-y-4'>
            <div className='flex flex-col space-y-2'>
              <label className='text-lg label label-text '>email</label>
              <input className='p-2 input input-bordered' {...register('email')} />
            </div>
            <div className='flex flex-col space-y-2'>
              <label className='text-lg'>About</label>
              <textarea className='h-[300px] textarea textarea-bordered' {...register('bio')} />
            </div>
            <div className='flex flex-col space-y-2'>
              <label className='text-lg'>age</label>
              <input className='p-2 input input-bordered' {...register('age')} />
            </div>

            <div className='flex flex-col space-y-2'>
              <label className='text-lg'>Gender</label>
              <select className='select rounded-none select-bordered' {...register('gender')}>
                <option
                  className=' px-2 py-3 select-bordered '
                  value='Gender'
                  selected={true}
                  disabled={true}
                >
                  select gender
                </option>
                <option className='p-4' value='female'>
                  female
                </option>
                <option value='male'>male</option>
                <option value='other'>other</option>
              </select>
            </div>
          </form>
          <div className='mb-6 flex flex-col space-y-2'>
            <label className='text-lg'>Topics</label>
            <div
              className='tabs  w-[90%] flex l'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {catagories?.map((cat: any) => {
                return <Tab name={cat.name} setTopics={setTopics} id={cat.id} key={cat.id} />
              })}
            </div>
          </div>
          <button onClick={handleSubmit(onSubmit)} className='btn btn-primary w-full'>
            Next
          </button>
        </div>
      </div>
    </>
  )
}
export default CreateProfile
