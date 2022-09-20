import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Tpoll } from '../../../types/user'
import { useAxios } from '../axios/axios'
import Comments from '../componets/comment'
import CommentInput from '../componets/poll/commetInput'
import Poll from '../componets/poll/poll'
import { useAppContext } from '../context/AppContextProvider'

const PollsDetails = () => {
  const [poll, setPOll] = useState<Tpoll | null>(null)
  const { comments, setComments } = useAppContext()
  const { id } = useParams()
  const instance = useAxios()

  const getPollDetails = async () => {
    const res = await instance.get(`/poll/${id}`)
    console.log(res.data)
    setPOll(res.data)
    setComments(res.data.Comment)
  }

  useEffect(() => {
    getPollDetails()
  }, [])

  return (
    <>
      {poll && (
        <>
          <Poll
            title={poll.title}
            id={poll.id}
            key={poll.id}
            createdAt={poll.createdAt}
            updated_at={poll.updated_at}
            Option={poll.Option}
            creator={poll.creator}
            Comment={comments}
            votes={poll.votes}
          />

          <div className='w-full  mt-1 p-4 '>
            <div className='divider'></div>

            {/* comments  */}
            <CommentInput pollId={poll.id} />
            <Comments comments={comments} />
          </div>
        </>
      )}
    </>
  )
}
export default PollsDetails
