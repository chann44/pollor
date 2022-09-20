import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
      <nav className='w-full p-4 flex justify-between items-center'>
        <h1 className='text-3xl'>PollsDit</h1>
        <div className='flex justify-between text-lg items-center space-x-3'>
          <Link to='/signup'>
            <button className='px-8 py-2 bg-primary'>signup</button>
          </Link>
          <Link to='/login'>
            <button className='px-8 py-2 border-primary border-solid border'>login</button>
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
