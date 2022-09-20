import { useState } from 'react'
import { TComment } from '../../../../types/user'
import { useAxios } from '../../axios/axios'
import { useAppContext } from '../../context/AppContextProvider'

interface Props {
  pollId: number
}

const CommentInput = ({ pollId }: Props) => {
  const { user } = useAppContext()
  const [text, setText] = useState<string>()
  const { setComments } = useAppContext()
  const instance = useAxios()
  console.log(user?.id)

  const DOcomment = async () => {
    const res = await instance.post('/poll/comment', {
      text: text,
      userId: user?.id,
      pollId: pollId,
    })

    const comment: TComment = res.data

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setComments((prev: TComment[] | any) => {
      return [
        {
          creator: comment.creator,
          text: comment.text,
          createdAt: comment.createdAt,
          id: comment.id,
        },
        ...prev,
      ]
    })

    console.log(res.data)
  }

  return (
    <>
      <div className='flex space-x-2'>
        <div className='h-[50px] w-[50px] bg-primary rounded-full'></div>
        <div className='flex-grow poll flex items-center '>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key == 'Enter') {
                DOcomment()
              }
            }}
            type='text'
            placeholder='comment your reply'
            className='w-full bg-transparent border-none p-2 focus:outline-none'
          />
        </div>
      </div>
    </>
  )
}
export default CommentInput
