import Poll from '../componets/poll/poll'
import { useAxios } from '../axios/axios'
import { useEffect, useState } from 'react'
import { Tpoll } from '../../../types/user'
import { useAppContext } from '../context/AppContextProvider'

const Feed = () => {
  const instance = useAxios()
  const [polls, setPolls] = useState<Tpoll[] | null>(null)
  const { refetch } = useAppContext()
  const getfeed = async () => {
    try {
      const res = await instance.get('/feed')
      console.log(res)
      setPolls(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getfeed()
  }, [refetch])

  return (
    <>
      {polls?.map((poll: Tpoll) => {
        return (
          <>
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
            <div className='divider'></div>
          </>
        )
      })}
    </>
  )
}

export default Feed
