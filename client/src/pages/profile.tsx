import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useParams } from 'react-router-dom'
import { Tpoll, User } from '../../../types/user'
import { useAxios } from '../axios/axios'
import Pfp from '../componets/layout/pfp'
import Poll from '../componets/poll/poll'
import { useAppContext } from '../context/AppContextProvider'

const Profile = () => {
  const { userid } = useParams()
  const instance = useAxios()
  const [cookies, setCookie, removeCookie] = useCookies(['jwtToken'])
  const [profile, setProfile] = useState<User | null>(null)

  const getUserProfile = async () => {
    try {
      const res = await instance.get(`/profile/${userid}`)
      console.log(res.data)
      setProfile(res.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getUserProfile()
  }, [userid])

  return (
    <>
      <div className=' w-full p-4'>
        <div className='flex p-10 space-x-6'>
          <div className='h-20 w-20'>
            <Pfp img={profile?.profile?.pfp} />
          </div>
          <div className=' w-full space-y-2 p'>
            <div className='w-full flex justify-between'>
              <h1 className='text-3xl'>{profile?.username}</h1>
            </div>
            <p>{profile?.profile?.bio}</p>
            <p className='text-sm stat-title'>
              joined at :{' '}
              {profile?.createdAt && new Date(profile?.createdAt.toString()).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className='divider'></div>

        <div className=''>
          {profile?.Poll.map((poll: Tpoll) => {
            return (
              <>
                <Poll
                  title={poll.title}
                  id={poll.id}
                  key={poll.id}
                  createdAt={poll.createdAt}
                  updated_at={poll.updated_at}
                  Option={poll.Option}
                  creator={poll.creator}
                  Comment={poll.Comment}
                  votes={poll.votes}
                />

                <div className='divider'></div>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Profile
