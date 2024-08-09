import axios from 'axios'
import './App.css'
import UserLayout from './layouts/user/Layout'
import { useAppSelector } from './app/hooks'
import { BASE_URL } from './config';
function App() {

  /*const {token} = useAppSelector(data => data.user);
  axios.interceptors.request.use(
    (config) => {
      if (token && !config.url?.includes('/auth/signin') && !config.url?.includes('/auth/signup')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config
    },
    (error) => {
      return Promise.reject(error);
    }
  )*/

  return (
    <>
      <UserLayout />
    </>
  )
}

export default App
