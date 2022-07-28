import React, { useState, useContext, useReducer, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import fetchEventList from './scrape/scrape'

const AppContext = React.createContext()




const AppProvider = ({ children }) => {

  const [user,setUser] = useState({
    "sub": "8",
    "email": "a@uwindsor.ca",
    "name": "Ariana Avdoulos",
    "expiresIn": 100000,
    "iat": 1658987410,
    "exp": 1658991010
  })

  const root = 'https://809f-216-8-184-8.ngrok.io'
  const registerURL = `${root}/user/register`
  const loginURL = `${root}/user/login`
  const registerEventURL = `${root}/event/register?userID=${user.sub}`
  const getUserEventsURL = `${root}/event/user_events?userID=${user.sub}`
  const cancelEventURL = `${root}/event/cancel?userID=${user.sub}&eventID=`
  const editProfileURL = `${root}/user/edit`


  const logout = () => {
    setUser(null)
  }
  // #region POST
  const POST_Response = {
    status: 501,
    content: 'Error: Not Implemented.'
  }

  /**
   * Sends a POST request to a given url
   * @param {Object} POST_data Data to pass to the url in the POST body
   * @param {string} url web address of where to send the post request
   * @returns a POST response object => {status: number, text: responseData}
   */
  const POST = async(POST_data, url) => {

    /**
     * Configure options
     */
    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(POST_data)
      };
      
      /**
       * Try to make POST request
       */
      try {

        //fetch data and get data contents
        const response = await fetch(url, options);
        let data = ""
        data = await response.text()

        /*Change POST_Response to match the actual response*/
        POST_Response.status = response.status;
        POST_Response.content = data
        
        return POST_Response
      } 
      catch (error) {
        console.log(error)
        return POST_Response;
      }

    }
  /**
   * Attempts to create a new user in the system with the given parameters
   * @param {string} _address user's street address
   * @param {string} _first_name user's first name
   * @param {string} _last_name user's last name
   * @param {string} _email user's email
   * @param {string} _password user's passowrd
   * @returns a POST response object => {status: number text: string}
   */
  const registerPOST = (_address,_first_name, _last_name, _email, _password) => {

    //format user data
    let userData = {
        address: _address,
        email: _email,
        firstName: _first_name,
        lastName: _last_name,
        password: _password
    };

    //send response
    let registerResponse =  POST(userData,registerURL)
    
    //Modifiy POST response data depending on statuus
    switch (registerResponse.status) {
      case 200:
        registerResponse.text = 'Account Created. Please Login'
        return registerResponse;
  
      default:
        return registerResponse;
    }
  }

  /**
   * Attempts to autheticate the user with the given params
   * @param {*} _email User's email
   * @param {*} _password User's password
   * @returns a POST response object => {status: number, text: responseData}. If successful (status == 200), the text attribute of the response object will contain the verification token
   */
  const loginPOST = async(_email, _password) => {

    //format user data
    let userData = {
        email: _email,
        password: _password
    };

    //send response
    let loginResponse =  await POST(userData,loginURL) 

    //Modifiy POST response data depending on statuus
    switch (loginResponse.status) {
      case 200:
        // setUser(jwt_decode(loginResponse.content))
        return loginResponse;

      default:
        return loginResponse;
    }
  }

  const registerEventPOST = async(event) => {
    //format user data
    try {
      let registerRespone = POST(event,registerEventURL)

    } catch (error) {
      console.log(error)
    }
  }

  const cancelEvent = (eventId) => {
    try {
      let cancelResposne = POST({},cancelEventURL+eventId)
    } catch (error) {
      
    }
  }
  const updateProfilePOST = async(id, firstName, lastName, address, phoneNumber) => {
    const userData = {id,firstName,lastName,address,phoneNumber}

    let updateResponse = POST_Response
    try {
      updateResponse = await POST(userData, editProfileURL)
    } catch (error) {
      console.log(error)
    }

    return updateResponse

  }
  // #endregion

  
  //#region Get
  const getUserEventsGET = async() => {
    try {
      let response = await fetch(getUserEventsURL)
      let data = await response.json()
    } catch (error) {
      
    }
    
  }
  //#endregion

    return (
        <AppContext.Provider
          value={{
            user,
            setUser,
            logout,
            registerPOST, 
            loginPOST,
            fetchEventList,
            registerEventPOST,
            getUserEventsGET,
            cancelEvent,
            updateProfilePOST,
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
