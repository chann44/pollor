import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tpoll } from '../../../../types/user'
import { useAppContext } from '../../context/AppContextProvider'
import Pfp from '../layout/pfp'
import OptionEl from './Options'

const Poll = ({ id, title, creator, Option, Comment, votes }: Tpoll) => {
  const { user } = useAppContext()
  const [pVotes, setPvotes] = useState(votes)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  return (
    <>
      <div className='w-full  flex space-x-10  p-8'>
        <div className='w-14 h-14'>
          <Pfp />
        </div>
        <div className='space-y-4 w-full'>
          <div className=''>
            <Link to={`/profile/${creator.id}`}>
              <p className='text-lg font-bold'>{creator?.username}</p>
            </Link>
            <p className='text-sm'>3 days ago </p>
          </div>
          <div className='w-full space-y-6'>
            <Link to={`/poll/${id}`}>
              <h2 className='text-xl'>{title} </h2>
            </Link>
            {/* optiona */}
            <OptionEl
              totalVotes={pVotes}
              setPvotes={setPvotes}
              setAlreadyVoted={setAlreadyVoted}
              creatorId={creator.id}
              options={Option}
              pIsSelected={creator.id == user?.id ? true : false}
            />
            <div className='w-full flex text-lg  justify-between'>
              <p className='text-primary underline'>{pVotes} vote</p>
              <p className='text-primary underline'>{Comment?.length} comments</p>
            </div>
            {alreadyVoted && <p className='text-sm text-red-800 '>you have already voted</p>}
            {/* comment */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Poll
