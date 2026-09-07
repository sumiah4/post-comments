import './App.css';
import AddPost from './pages/AddPost';
import ListPost from './pages/ListPost';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [authUser, setAuthUser] = useState({ username: "", id: 0, status: false });
  //let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('accessToken')) {
    axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
      headers: { accessToken: localStorage.getItem('accessToken') }
    }).then((res) => {
      if (res.data.error) {
        setAuthUser({
          username: "",
          id: 0,
          status: false
        });
      } else {
        setAuthUser({
          username: res.data.username,
          id: res.data.id,
          status: true
        })
      }
    })
  }}, []);
  const logout = () => {
    setAuthUser({
      username: "",
      id: 0,
      status: false
    });
    localStorage.removeItem('accessToken');
    //navigate('/');
  }
  return (
    <div className="App">
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <Router>
          <div className="navbar">
            <Link to="/"> Home Page</Link>
            <Link to="/addpost"> Create A Post</Link>
            {!authUser.status ?
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register </Link>
              </>
              :
              <>
                <button onClick={logout}>Logout</button>
                {authUser.username}
              </>
            }
          </div>
          <Routes>
            <Route path='/' element={<ListPost />}></Route>
            <Route path='/addpost' element={<AddPost />}></Route>
            <Route path='/viewpost/:id' element={<ViewPost />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Registration />}></Route>
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
