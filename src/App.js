import React from 'react';
import {Route, BrowserRouter } from 'react-router-dom'
import './App.css';
import Login from './Login'
import UserPost from './UserPost'


function App() {
  return (
    <BrowserRouter>
      <Route path = '/' component = {Login} exact ={true}/>
      <Route path = '/users' component = {UserPost} exact ={true}/> 
    </BrowserRouter>  
  )
}

 
export default App;
