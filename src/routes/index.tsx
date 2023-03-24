import { useRoutes, Navigate } from 'react-router-dom'
import Building from '@/view/building'
import Test from '@/view/test'
import Login from '@/view/login'

const elements = [{
  path: '/test',
  element: <Test/>
}, {
  path: '/building',
  element: <Building />
}, {
  path: '/login',
  element: <Login />
  }, {
    // 找不到的都重定向大屏login
  path: '*',
  element: <Navigate to='/login' />
  }]
export default elements
