import axios from 'axios'
import { useCookies } from 'react-cookie'

export const useAxios = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookes] = useCookies(['jwtToken'])
  const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: cookies.jwtToken,
    },
  })
  return instance
}
