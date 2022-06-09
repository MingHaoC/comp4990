import React, { useState, useContext, useReducer, useEffect } from 'react'
const root = 'http://localhost:8080'
const registerURL = `${root}/user/register`
const loginURL = `${root}/user/login`

const AppContext = React.createContext()




const AppProvider = ({ children }) => {

  const register = async(_address,_first_name, _last_name, _email, _password) => {
    let userData = {
        address: _address,
        email: _email,
        first_name: _first_name,
        last_name: _last_name,
        password: _password
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
        };

    const response = await fetch(registerURL, options );
  }

  const login = async(_email, _password) => {
    let userData = {
        email: _email,
        password: _password
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
        };

    const response = await fetch(loginURL, options );
    const token = await response.text();
    // console.log(token)
  }
  
    return (
        <AppContext.Provider
          value={{
          }}
        >
          {children}
        </AppContext.Provider>
      )
    
}

const useAppContext = () => {
    return useContext(AppContext)
  }

export { AppContext, AppProvider, useAppContext }
