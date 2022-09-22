import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContextProvider'

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAppContext()
  useEffect(() => {
    console.log('is authenticated', isAuthenticated)
  }, [isAuthenticated])

  if (!isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' />
  }

  return children
}

export function HitHomePage({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAppContext()
  if (isAuthenticated) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/' />
  }
  return children
}
