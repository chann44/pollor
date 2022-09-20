import { TComment } from '../../../../types/user'
import Pfp from '../layout/pfp'

const Comment = ({ text, creator }: TComment) => {
  return (
    <div className='flex space-x-3 border  p-2'>
      <div className='w-9 h-9'>
        <Pfp />
      </div>
      <div>
        <div className='text-sm'>
          <h3 className='font-bold'>{creator?.username}</h3>
          <small>{}</small>
        </div>
        <div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
export default Comment
