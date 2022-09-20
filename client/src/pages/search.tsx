import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tpoll } from '../../../types/user'
import { useAxios } from '../axios/axios'
import Poll from '../componets/poll/poll'

interface TabProp {
  name: string
  id: number
  setCat: any
  cat: string
}

const Tab = ({ name, id, setCat, cat }: TabProp) => {
  return (
    <div key={id} className='tab'>
      <button
        onClick={(e) => {
          console.log(name)
          setCat(name)
        }}
        className={(cat == name ? ' text-primary  font-bold ' : '') + ' px-4 py-1  '}
      >
        {name}
      </button>
    </div>
  )
}

const Search = () => {
  const { searchTerm } = useParams()
  const instance = useAxios()
  const [polls, setPolls] = useState<Tpoll[] | null>(null)
  const [catagories, setCatagories] = useState<any>()
  const [activecat, setCat] = useState('')
  const fetchSearchResults = async () => {
    const res = await instance.get(`/poll/search/${searchTerm}`)
    setPolls(res.data)
    console.log(res.data)
  }

  const getAllCatagores = async () => {
    const res = await instance.get('/poll/dropit')
    setCatagories(res.data)
    console.log('catagories', res.data)
  }

  useEffect(() => {
    getAllCatagores()
  }, [])

  useEffect(() => {
    fetchSearchResults()
  }, [searchTerm])

  const pollbycatagory = async () => {
    const res = await instance.post('/poll/catagory', {
      cat: activecat,
    })
    setPolls(res.data)
    console.log(res.data)

    console.log('poll by catagory', res)
  }

  useEffect(() => {
    pollbycatagory()
  }, [activecat])

  return (
    <>
      <div className=''>
        <h1 className='text-2xl text-bold'>Explre</h1>
        <div className='tabs  w-[90%] flex l'>
          {catagories?.map((cat: any) => {
            return <Tab name={cat.name} cat={activecat} setCat={setCat} id={cat.id} key={cat.id} />
          })}
        </div>
      </div>
      {polls?.length !== 0 ? (
        polls?.map((poll: Tpoll) => {
          return (
            <Poll
              title={poll.title}
              id={poll.id}
              key={poll.id}
              createdAt={poll.createdAt}
              updated_at={poll.updated_at}
              Option={poll.Option}
              creator={poll.creator}
              Comment={poll.Comment}
              votes={poll.votes}
            />
          )
        })
      ) : (
        <div>
          <p className='font-bold text-2xl text-center'>No polls for {activecat}</p>
        </div>
      )}
    </>
  )
}

export default Search
