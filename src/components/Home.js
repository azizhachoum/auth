import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()



    const logout = ()=> {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        navigate('/')
      }

  return (
    <div>
             <button type="button" onClick={logout} class="btn btn-dark">logout</button>
    </div>
  )
}

export default Home