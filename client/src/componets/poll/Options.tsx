import { useState } from 'react'
import { TOption } from '../../../../types/user'
import { useAxios } from '../../axios/axios'
import { useAppContext } from '../../context/AppContextProvider'
import OptionItem from './optionITem'

interface OptionProp {
  options: TOption[]
  pIsSelected: boolean
  creatorId: number
  setAlreadyVoted: any
  totalVotes: number
  setPvotes: any
  setShowPie: any
}

const OptionEl = ({
  options,
  pIsSelected,
  creatorId,
  setAlreadyVoted,
  totalVotes,
  setPvotes,
  setShowPie,
}: OptionProp) => {
  const [isSelected, setIsSelected] = useState(pIsSelected)

  const { user } = useAppContext()
  const instance = useAxios()
  const doVote = async (
    optionid: number,
    pollId: number,
    setCurrentVotes: any,
    currentVotes: number,
  ) => {
    console.log(optionid, pollId)
    try {
      const res = await instance.post('/poll/vote', {
        optionId: optionid,
        userId: user?.id,
        pollId: pollId,
      })
      setCurrentVotes(currentVotes + 1)
      setPvotes(totalVotes + 1)
      // console.log(res.data)
    } catch (e: any) {
      if (e.response.status == 409) {
        setAlreadyVoted(true)
      }
      console.log(e)
    }
  }
  return (
    <>
      <div className='w-full space-y-3 text-lg'>
        {options.map((Option: TOption) => {
          return (
            <>
              <OptionItem
                setShowPie={setShowPie}
                totalVotes={totalVotes}
                doVote={doVote}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                optoinId={Option.id}
                pollId={Option.pollId}
                text={Option.text}
                vote={Option.vote}
              />
            </>
          )
        })}
      </div>
    </>
  )
}

export default OptionEl
