import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { useCookies } from 'react-cookie'
import { TComment, User } from '../../../types/user'
import { useAxios } from '../axios/axios'
interface AppContextProviderInterface {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  isAuthenticated: boolean
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  comments: TComment[]
  setComments: Dispatch<SetStateAction<TComment[]>>
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  refetch: boolean
  setRefetch: Dispatch<SetStateAction<boolean>>
  showEditProfile: boolean
  setShowEditProfile: Dispatch<SetStateAction<boolean>>
}

interface IContextProps {
  children: ReactNode
}

const AppContext = createContext<AppContextProviderInterface>({} as AppContextProviderInterface)

export const useAppContext = () => {
  return useContext(AppContext)
}

export const AppContextProvider = ({ children }: IContextProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [comments, setComments] = useState<TComment[] | any>()
  const [showModal, setShowModal] = useState(false)
  const [alreadyVoted, setAlreadyVoted] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['jwtToken'])
  const instance = useAxios()
  const [refetch, setRefetch] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false)
  const getLoggedInUser = async () => {
    const user = await instance.get('/')
    console.log(user)
    setUser(user.data)
  }

  useEffect(() => {
    console.log(cookies.jwtToken)
    if (cookies.jwtToken) {
      setIsAuthenticated(true)
      console.log('req')
      getLoggedInUser()
    } else {
      console.log(null)
    }
  }, [cookies.jwtToken])

  const sharedState = {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    comments,
    setComments,
    showModal,
    setShowModal,
    alreadyVoted,
    setAlreadyVoted,
    refetch,
    setRefetch,
    showEditProfile,
    setShowEditProfile,
  }
  return (
    <>
      <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
    </>
  )
}
