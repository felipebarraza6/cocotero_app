import React, { useReducer, useEffect } from 'react'
import {login_reducer} from './reducers/auth'
import api from '../src/api/endpoints'
import './App.css'

import Home from './containers/Home'
import Login from './containers/Login'
import SignUp from './containers/SignUp'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
export const AuthContext = React.createContext()


const initialState = {
  isAuthenticated: false,
  access_token: null,
  user: null,
  approved_courses: null
}


function App() {
  
  const [state, dispatch] = useReducer(login_reducer, initialState) 

  useEffect(()=> {
    
    const access_token = JSON.parse(localStorage.getItem('access_token') || null)  
    const user = JSON.parse(localStorage.getItem('user') || null)

    async function get_user(user){
      const request = await api.user.get_profile(user).then((response)=> {
          
          const access_token = JSON.parse(localStorage.getItem('access_token') || null)
          const user = response.user 
          dispatch({
            type:'LOGIN',
            payload: {
              access_token,
              user
            }
          })
      })
      return request
    }

    if(user && access_token){
      get_user(user.username)
    }
  },[])


  return (
    <AuthContext.Provider
      value = {{
        state,
        dispatch
      }}
    >
      <BrowserRouter>
      <Switch>
        <Route exact path='/signup'>
          <SignUp />
        </Route>
        <Route exact path='/'>
          {state.isAuthenticated ?
        <Home />:
        <Login />

      }

        </Route>
      </Switch>
      </BrowserRouter>
          </AuthContext.Provider>
  )
}


export default App
