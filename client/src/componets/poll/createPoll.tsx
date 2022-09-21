import { useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineSend } from 'react-icons/ai'
import { useAxios } from '../../axios/axios'
import { useAppContext } from '../../context/AppContextProvider'
import Pfp from '../layout/pfp'

type choice = {
  type: string
  value: string
}

const CreatePoll = () => {
  const [catagories, setCatagories] = useState<any>()
  const [selectedCat, setSelectedCat] = useState<number>(0)

  const [title, setTitle] = useState('')
  const { user, showModal, setShowModal, setRefetch } = useAppContext()
  const [inputArr, setInputArr] = useState<choice[]>([
    {
      type: 'text',
      value: '',
    },
    {
      type: 'text',
      value: '',
    },
  ])
  const instance = useAxios()

  const getAllCatagores = async () => {
    const res = await instance.get('/poll/dropit')
    setCatagories(res.data)
    console.log('catagories on create poll', res.data)
  }

  useEffect(() => {
    getAllCatagores()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<[] | any>([])
  const addChoice = () => {
    setInputArr((prev: choice[]) => {
      return [
        ...prev,
        {
          type: 'text',
          value: '',
        },
      ]
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onchangeInput = (val: any, index: any) => {
    const temp = options
    temp[index] = val.target.value
    setOptions(temp)
    console.log(temp)
  }

  const createPoll = async () => {
    const res = await instance.post('/poll/create', {
      title: title,
      options: options,
      userId: user?.id,
      catagoryId: selectedCat,
    })
    setRefetch(true)
    console.log('response is this', res)
  }

  useEffect(() => {
    console.log(options)
  }, [options])

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center  bg-white  flex overflow-x-hidden overflow-y-auto fixed top-0 left-0 right-0 z-50 outline-none focus:outline-none bg-opacity-50  h-screen'>
            <div className='relative  w-auto my-6 mx-auto max-w-3xl '>
              <div className='border-0 rounded-lg  relative bg-white flex flex-col w-full bg-dark outline-none focus:outline-none shadow-2xl'>
                <div className='flex items-center justify-between p-3  rounded-t '>
                  <button className='text-3xl' onClick={() => setShowModal(false)}>
                    <AiOutlineClose />
                  </button>
                  <button
                    className='text-3xl'
                    onClick={() => {
                      createPoll()
                      setShowModal(false)
                    }}
                  >
                    <AiOutlineSend />
                  </button>
                </div>
                <div className='relative p-3 flex-auto w-[600px] bg-dark'>
                  <div className='flex space-x-3 bg-transparent'>
                    <div className=' min-w-14 w-14 min-h-14'>
                      <Pfp />
                    </div>
                    <div className='grow'>
                      <input
                        onChange={(e) => {
                          setTitle(e.target.value)
                        }}
                        type='text'
                        className='w-full p-3 border-none bg-transparent outline-none focus:outline-none focus:border-none'
                        placeholder='Ask a question ....'
                      />
                      <select
                        className=' m-3  select border rounded bg-transparent select-ghost w-full max-w-xs'
                        onChange={(e) => {
                          setSelectedCat(Number(e.target.value))
                        }}
                      >
                        <option key={1435} disabled selected>
                          add a catagory to poll
                        </option>
                        {catagories?.map((cat: any) => {
                          return (
                            <option value={cat.id} key={cat.id}>
                              {cat.name}
                            </option>
                          )
                        })}
                      </select>
                      <div className='border p-2 rounded space-y-4'>
                        {inputArr?.map((item: choice, index: number) => {
                          return (
                            <>
                              <input
                                onChange={(e) => {
                                  onchangeInput(e, index)
                                }}
                                type={item.type}
                                placeholder={`choice ${index + 1}`}
                                className='w-full p-3 bg-transparent border outline-none rounded  focus:outline-none border-primary focus:border-primary'
                              />
                            </>
                          )
                        })}
                        <div className='w-full'>
                          <button
                            onClick={addChoice}
                            className='w-full bg-primary  p-3 text-center'
                          >
                            Add Choice
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}

export default CreatePoll
