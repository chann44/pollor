import { useAppContext } from '../../context/AppContextProvider'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AiFillFrown, AiOutlineMore } from 'react-icons/ai'
import Pfp from './pfp'
import { useCookies } from 'react-cookie'
import EdiProfile from '../editProfile'
const NavbarMain = () => {
  const { user, showEditProfile, setShowEditProfile } = useAppContext()
  const [searchTerm, setSearchTerm] = useState<string>('')
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
  const { setShowModal, setIsAuthenticated } = useAppContext()

  return (
    <>
      <div className='navbar bg-base-100'>
        <div className='flex-1'>
          <Link to='/'>
            <a className='btn btn-ghost normal-case text-xl'>Pollor</a>
          </Link>
        </div>
        <div className='flex-none gap-2'>
          <div className='form-control'>
            <input
              type='text'
              placeholder='Search'
              className='input input-bordered'
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
              onKeyDown={(e) => {
                if (e.key == 'Enter') {
                  navigate(`/search/${searchTerm}`)
                }
              }}
            />
          </div>
          <button
            data-tip='create'
            className='tooltip tooltip-primary tooltip-bottom btn btn-circle btn-primary'
            onClick={(e) => {
              setShowModal(true)
            }}
          >
            +
          </button>
          <button
            data-tip='explore'
            className='px-5 tooltip tooltip-primary tooltip-bottom btn bg-transparent btn-primary'
            onClick={(e) => {
              navigate(`/search/${'trending'}`)
            }}
          >
            explore
          </button>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <img src={user?.profile?.pfp} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
            >
              <li
                onClick={() => {
                  navigate(`/profile/${user?.id}`, { replace: true })
                }}
              >
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li
                onClick={() => {
                  setShowEditProfile(true)
                }}
              >
                <a>Edit profile</a>
              </li>
              <li
                onClick={async () => {
                  removeCookie('jwtToken')
                  setIsAuthenticated(false)
                }}
              >
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showEditProfile && <EdiProfile />}
    </>
  )
}

export default NavbarMain
