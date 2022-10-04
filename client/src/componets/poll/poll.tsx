import { useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { AiFillPieChart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { TOption, Tpoll } from '../../../../types/user'
import { useAppContext } from '../../context/AppContextProvider'
import Pfp from '../layout/pfp'
import OptionEl from './Options'

const Poll = ({ id, title, creator, Option, Comment, votes }: Tpoll) => {
  const { user } = useAppContext()
  const [pVotes, setPvotes] = useState(votes)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  const [showPie, setShowPie] = useState(false)
  console.log('options', Option)
  const [userData, setUserData] = useState({
    labels: Option.map((data: TOption) => data.text),
    datasets: [
      {
        label: 'Users Gained',
        data: Option.map((data) => data.vote),
        backgroundColor: [
          '#9854B2',
          '#7259FF',
          '#E9115A',
          '#26856B',
          '#CF4321',
          '#9854B2',
          '#3371E4',
          '#7259FF',
          '#E9115A',
          '#26856B',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  })

  return (
    <>
      <div className='w-full  flex space-x-10  p-8'>
        <div className='w-14 h-14'>
          <Pfp img={creator?.profile?.pfp} />
        </div>
        <div className='space-y-4 w-full'>
          <div className='flex justify-between '>
            <div>
              <Link to={`/profile/${creator.id}`}>
                <p className='text-lg font-bold'>{creator?.username}</p>
              </Link>
              <p className='text-sm'>3 days ago </p>
            </div>
            <div>
              <button
                onClick={() => {
                  setShowPie(!showPie)
                }}
              >
                <AiFillPieChart size={32} />
              </button>
            </div>
          </div>
          <div className='w-full space-y-6'>
            <Link to={`/poll/${id}`}>
              <h2 className='text-xl'>{title} </h2>
            </Link>
            {/* optiona */}
            {showPie ? (
              <Pie
                data={userData}
                options={{
                  animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                  },
                }}
              />
            ) : (
              <OptionEl
                setShowPie={setShowPie}
                totalVotes={pVotes}
                setPvotes={setPvotes}
                setAlreadyVoted={setAlreadyVoted}
                creatorId={creator.id}
                options={Option}
                pIsSelected={creator.id == user?.id ? true : false}
              />
            )}
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
