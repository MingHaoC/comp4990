import React, { useState, useContext, useReducer, useEffect } from "react";
import jwt_decode from "jwt-decode";
import fetchEventList from "./scrape/scrape";
  const root = 'https://3dce-216-8-186-247.ngrok.io'
  const registerURL = `${root}/user/register`
  const loginURL = `${root}/user/login`

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [token, setUserToken] = useState(null)
  const [user,setUser] = useState(null)


  

  const logout = () => {
    setUser(null);
  };
  // #region POST
  const POST_Response = {
    status: 501,
    content: "Error: Not Implemented.",
  };

  /**
   * Sends a POST request to a given url
   * @param {Object} POST_data Data to pass to the url in the POST body
   * @param {string} url web address of where to send the post request
   * @returns a POST response object => {status: number, text: responseData}
   */
  const POST = async (POST_data, url) => {
    /**
     * Configure options
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authentication": token
      },
      body: JSON.stringify(POST_data),
    };

    /**
     * Try to make POST request
     */
    try {
      //fetch data and get data contents
      const response = await fetch(url, options);
      let data = "";
      data = await response.text();

      /*Change POST_Response to match the actual response*/
      POST_Response.status = response.status;
      POST_Response.content = data;

      return POST_Response;
    } catch (error) {
      console.log(error);
      return POST_Response;
    }
  };
  /**
   * Attempts to create a new user in the system with the given parameters
   * @param {string} _address user's street address
   * @param {string} _first_name user's first name
   * @param {string} _last_name user's last name
   * @param {string} _email user's email
   * @param {string} _password user's passowrd
   * @returns a POST response object => {status: number text: string}
   */
  const registerPOST = (
    _address,
    _first_name,
    _last_name,
    _email,
    _password
  ) => {
    //format user data
    let userData = {
      address: _address,
      email: _email,
      firstName: _first_name,
      lastName: _last_name,
      password: _password,
    };

    //send response
    let registerResponse = POST(userData, registerURL);

    //Modifiy POST response data depending on statuus
    switch (registerResponse.status) {
      case 200:
        registerResponse.text = "Account Created. Please Login";
        return registerResponse;

      default:
        return registerResponse;
    }
  };

  /**
   * Attempts to autheticate the user with the given params
   * @param {*} _email User's email
   * @param {*} _password User's password
   * @returns a POST response object => {status: number, text: responseData}. If successful (status == 200), the text attribute of the response object will contain the verification token
   */
  const loginPOST = async (_email, _password) => {
    //format user data
    let userData = {
      email: _email,
      password: _password,
    };

    //send response
    let loginResponse = await POST(userData, loginURL);

    //Modifiy POST response data depending on statuus
    switch (loginResponse.status) {
      case 200:
        // setUser(jwt_decode(loginResponse.content))
        return loginResponse;

      default:
        return loginResponse;
    }
  };

  const registerEventPOST = async (event) => {
    //format user data
    try {
      let registerRespone = POST(event,`${root}/event/register?userID=${user.sub}`);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEvent = async(eventId) => {
    try {
      let cancelResposne = await POST({},`${root}/event/cancel?userID=${user.sub}&eventID=`+eventId)
      POST_Response.status = cancelResposne.status
      POST_Response.content = ""
    } catch (error) {
     console.log(error) 
    }
  }
  const updateProfilePOST = async(id, firstName, lastName, address, phoneNumber) => {



    const userData = {id,firstName,lastName,address,phoneNumber}
    try {

    let updateResponse = POST_Response
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'plain/text');
      myHeaders.append('Authorization', token);
      let response = await fetch(`${root}/user?userId=${user.sub}`, 
        {
          method: 'POST',
          headers: myHeaders,
          body: JSON.stringify(userData),

        }
      )
      console.log(response.status)
    } catch (error) {
      console.log(error);
    }

    return updateResponse;
  };
  // #endregion

  //#region Get
  const getUserEventsGET = async () => {
    try {
      let response = await fetch(`${root}/event/user_events?userID=${user.sub}`)
      let data = await response.json()

      POST_Response.status = response.status
      POST_Response.content = data
      return POST_Response
    } catch (error) {
      console.log(error)
    }
    
  }

  const getUserGET = async() => {
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'plain/text');
      myHeaders.append('Authorization', token);
      let response = await fetch(`${root}/user?userId=${user.sub}`, 
        {
          method: 'GET',
          headers: myHeaders,
        }
      )
      POST_Response.status = response.status
      POST_Response.content = await response.json()
      return POST_Response
    } catch (error) {
      console.log(error)
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
        getUserGET,
        fetchEventList,
        registerEventPOST,
        getUserEventsGET,
        cancelEvent,
        setUserToken,
        updateProfilePOST,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useAppContext };
