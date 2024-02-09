import logo from './logo.svg';
import './App.css';
import AppNavbar from './components/AppNavbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';
import { getAuthUser } from './redux/actions/authActions';
import { useEffect } from 'react';
function App() {

  const {isLoading} = useSelector((state)=>state.authReducer.isLoading)
  const dispatch = useDispatch()
  const getUser =()=> {
    dispatch(getAuthUser())
  }

  useEffect(()=> {
    getUser();
  }, [])
/*
  if (isLoading) {
    return (
       // Spinner
       <div>
       <Spinner
 color="primary"
 style={{
   height: '3rem',
   width: '3rem'
 }}
>
 Loading...
</Spinner>
   </div>
    )
  }
  */
  return (
    <div className="App">
    
    <AppNavbar />

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/daschboard" element={<Dashboard/>}/>
    </Routes>
    </div>
  );
}

export default App;
