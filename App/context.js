import React, { useState, useContext, useReducer, useEffect } from 'react'
const root = 'http://localhost:8080'
const registerURL = `${root}/user/register`
const loginURL = `${root}/user/login`

const AppContext = React.createContext()




const AppProvider = ({ children }) => {

  const [user,setUser] = useState(null)


  const logout = () => {
    setUser(null)
  }
  // #region POST
  const POST_Response = {
    status: 501,
    text: 'Error: Not Implemented.'
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
        const response = await fetch(url, options );
        const data = await response.text();
        console.log(data)
        /*Change POST_Response to match the actual response*/
        let POST_Response_Modified = Object.create(POST_Response)
        POST_Response_Modified.status =  response.status;
        POST_Response_Modified.text = data
        
        return POST_Response_Modified
      } 
      catch (error) {
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
        first_name: _first_name,
        last_name: _last_name,
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
    let loginResponse =  POST(userData,loginURL) 

    //Modifiy POST response data depending on statuus
    switch (loginResponse.status) {
      case 200:
        loginResponse.text = 'Login Success... Routing Coming Soon'
        return loginResponse;

      default:
        return loginResponse;
    }
  }

  // #endregion

  
    return (
        <AppContext.Provider
          value={{
            user,
            setUser,
            logout,
            registerPOST, 
            loginPOST
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
