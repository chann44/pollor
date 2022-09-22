interface Props {
  img: string | undefined
}

const Pfp = ({ img }: Props) => {
  return (
    <>
      <div className='avatar '>
        <div className=' rounded-full'>
          <img src={img} />
        </div>
      </div>
    </>
  )
}

export default Pfp
