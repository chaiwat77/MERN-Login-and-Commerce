
import React,{ useState,useEffect } from "react";
import { Routes,Route } from 'react-router-dom'

//page
import Login from "./component/pages/auth/Login";
import Register from "./component/pages/auth/Register";
import Home from "./component/pages/Home";
// import router from "./component/routes/root";

//Layout
import Navbar from "./component/layouts/Navbar"
//page admin
import HomeAdmin from './component/pages/admin/Home'
//page user
import HomeUser from './component/pages/user/Home'
//function
import { currentUser } from "./component/functions/auth";
// redux
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const idtoken = localStorage.token
  if(idtoken) {
    currentUser(idtoken)
    .then(res=>{
      console.log(res.data);
      dispatch({
        type: 'LOGIN',
        payload: {
          token: idtoken,
          username:res.data.username,
          rolse: res.data.role,
        },
      });
    }).catch(err=>{
      console.log(err);
    });
  }




  return (
    <div className="App">
      <Navbar/>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      
        <Route path="/admin/index" element={<HomeAdmin/>}/>
        <Route path="/user/index" element={<HomeUser/>}/>

      </Routes>

    </div>
  );
}

export default App;
