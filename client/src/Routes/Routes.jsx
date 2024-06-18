import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Posts from '../pages/Post/Posts'
import Signin from '../pages/Signin/Signin'
import Signup from '../pages/Signup/Signup'
import Main from '../Layout/Main'

// Define routes inside the main layout
const mainRoutes = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'posts',
    element: <Posts />
  },
  {
    path: 'login',
    element: <Signin />
  },
  {
    path: 'register',
    element: <Signup />
  },
]




const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Main />
    ),
    children: mainRoutes
  },
])

export default router