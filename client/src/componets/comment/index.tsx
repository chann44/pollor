import { TComment } from '../../../../types/user'
import Comment from './comment'

interface CommentProp {
  comments: TComment[] | null
}

const Comments = ({ comments }: CommentProp) => {
  return (
    <>
      <div className='w-full py-8 space-y-8'>
        {comments?.map((comment: TComment) => {
          return (
            <Comment
              createdAt=''
              creator={comment.creator}
              id={comment.id}
              pollId={comment.pollId}
              text={comment.text}
              updatedAt={comment.updatedAt}
              key={comment.id}
            />
          )
        })}
      </div>
    </>
  )
}
export default Comments
