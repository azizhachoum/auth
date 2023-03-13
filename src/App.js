import Login from './components/Login';
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
import PrivateRoutes from './components/PrivateRoutes'


const App = () => {

      return ( 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/login" element ={<Login/>}/>
          <Route element ={<Register/>} path="/register"/>
          <Route element={<PrivateRoutes/>}>
                <Route element={<Home/>} path="/home" exact/>
          </Route>
          </Routes>
      </BrowserRouter>
      )
};

export default App;