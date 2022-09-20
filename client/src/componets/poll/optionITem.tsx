import { useState } from 'react'

interface Props {
  text: string
  vote: number
  isSelected: boolean
  setIsSelected: any
  doVote: any
  pollId: number
  optoinId: number
  totalVotes: number
}

const OptionItem = ({
  text,
  vote,
  pollId,
  optoinId,
  doVote,
  setIsSelected,
  isSelected,
  totalVotes,
}: Props) => {
  const [currentVotes, setCurrentVotes] = useState(vote)
  const per = (100 * currentVotes) / totalVotes
  const str = `${per}%`

  return (
    <>
      <div
        className='border relative w-full cursor-pointer flex items-center '
        onClick={(e) => {
          console.log('hi')
          doVote(optoinId, pollId, setCurrentVotes, currentVotes)
          setIsSelected(true)
        }}
      >
        <p className='p-4 flex justify-between w-full'>
          <span>{text}</span>
          <span>{isNaN(per) ? 0 : per.toFixed(0)}%</span>
        </p>
        {isSelected && (
          <p
            style={{
              width: str,
            }}
            className={' top-0 left-0 absolute  bg-primary bg-opacity-20 h-full'}
          ></p>
        )}
      </div>
    </>
  )
}

export default OptionItem
