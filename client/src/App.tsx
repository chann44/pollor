import { Route, Routes } from 'react-router-dom'
import NavbarMain from './componets/layout/Navbar1'
import Navbar from './componets/layout/Navbar2'
import Feed from './pages/feed'
import Login from './pages/login'
import PollsDetails from './pages/polldetails'
import Profile from './pages/profile'
import asset from '../public.json'
import { RequireAuth, HitHomePage } from './componets/layout/AuthRequired'
import { useAppContext } from './context/AppContextProvider'
import Search from './pages/search'
import CreatePoll from './componets/poll/createPoll'
import Signup from './pages/signup'
import CreateProfile from './pages/createprofile'

function App() {
  // this is te pleace for react-touter setup
  const { isAuthenticated } = useAppContext()
  console.log(asset.index)
  return (
    <>
      <div className='w-full min-h-screen ' data-theme='cupcake'>
        <div className='w-[60%] sticky top-0  m-auto z-50'>
          {isAuthenticated ? <NavbarMain /> : <Navbar />}
        </div>
        <div className='w-[60%] flex justify-center  min-h-screen m-auto'>
          <div className='w-[50%] border'>
            <Routes>
              <Route
                path='/'
                element={
                  <RequireAuth>
                    <CreateProfile />
                  </RequireAuth>
                }
              />
              <Route
                path='/profile/:userid'
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path='/poll/:id'
                element={
                  <RequireAuth>
                    <PollsDetails />
                  </RequireAuth>
                }
              />
              <Route
                path='/search/:searchTerm'
                element={
                  <RequireAuth>
                    <Search />
                  </RequireAuth>
                }
              />
              <Route
                path='/createprofile'
                element={
                  <RequireAuth>
                    <CreateProfile />
                  </RequireAuth>
                }
              />

              <Route
                path='/login'
                element={
                  <HitHomePage>
                    <Login />
                  </HitHomePage>
                }
              />
              <Route
                path='/signup'
                element={
                  <HitHomePage>
                    <Signup />
                  </HitHomePage>
                }
              />
            </Routes>
          </div>
        </div>
        <CreatePoll />
      </div>
    </>
  )
}

export default App
