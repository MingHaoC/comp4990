import React, { useContext, useReducer } from 'react'
import reducer from './loginReducer'
import initial_state from './inital_state'
import { useAppContext } from '../../../context'
import jwt_decode from "jwt-decode";

const LoginContext = React.createContext()

const init_state = {...new initial_state()}

/**
 * Provides actions for the login screen
 */
const LoginProvider = ({children}) => {

    
    const {
        loginPOST,  //login api call
        setUser ,    //Set user on successful login
        setUserToken,
    } = useAppContext();

    //Use reducer to update state only
    const [state, dispatch] = useReducer(reducer,init_state)
    
    /**
     * Retrieves the value of the email ponTextChange provided in the email input  and updates the state to reflect the changed email value
     * @param {string} value value retreived from the user in the email input onTextChange
     */
    const enterEmail = (value) => {
        dispatch({type: "ENTER_INPUT", payload: {label:"Email", value} })
    }

    /**
     * Retrieves the value of the password onTextChange provided in the password input  and updates the state to reflect the changed password value
     * @param {string} value password provdied by user in password input
     */
    const enterPassword = (value) => {
        dispatch({type: "ENTER_INPUT", payload: {label:"Password", value} })
    }

    /**
     * Sets the state of 'showResponseModal' contrary to the current state
     * The response modal is shown when there is a server error after pressing login button
     * @param {string} text (optional) sets the inner content of the response modal 
     */
    const toggleResponseModal = (text) => {
        dispatch({type: "SET_SHOW_RESPONSE_MODAL", payload: !state.showResponseModal})

        if(text != undefined){
            dispatch({type: "SET_RESPONSE_MODAL_CONTENT", payload: text})
        }
    }

    /**
     * Sets the state of 'HidePassword' contary to the current state
     */
    const toggleHidePassword = () => {
        dispatch({type:"SET_HIDE_PASSWORD", payload: !state.HidePassword})
    }
    /**
     * Takes the password and email values from the state and ensures that they are valid.
     * If the password or email values are invalid then the error input(s) are highlighted
     * If the password and email values are valid then they are POSTED to the login url
     * If the login post is successful then the user is set,
     * If the login post is unsuccessful then an error modal is displayed on screen
     */
    const login = async() => {

        /*Checks that state values are valid */
        _isValidEmailValue()
        _isValidPassword()

        //If no errors in any fields => continue
        if(!state.PasswordError.error && !state.EmailError.error){

            /*Set Loading screen before attempting fetch */
            dispatch({type: "SET_LOADING", payload: true})
            let response = { status: 500, content: 'System Error'}
            try {
            response = await loginPOST(state.Email, state.Password) 
            } catch (error) {
            }

            /*Stop loading screen after fetch */
            dispatch({type: "SET_LOADING", payload: false})

            //If attempt succeed => set user
            if(response.status == 200){
                setUserToken(`Bearer ${response.content}`)
                setUser(jwt_decode(response.content))
            }

            //If the attempt failed, give a response
            if(response.status != 200){
                toggleResponseModal(`${response.content}`)
            }
          
            /*Reset Inputs after login attempt*/
            enterEmail("")
            enterPassword("")
          
        }
        
    }

    /**
     * Opens modal that allows users to reset their password
     */
    const openForgotPasswordModal = () => {
        console.log("TODO")
    }

    //#region Private
    
    /**
     * Indicates if the email saved in state is valid and updates the 'EmailError' object in state accordingly
     */
    const _isValidEmailValue = () => {
        let hasError = false;
        let errorText = ""
        
        //If the email field is empty => give error
        if(state.Email.trim().length <= 0){
            hasError = true
            errorText = 'Please fill in required field.'
        }
        dispatch({type: "UPDATE_EMAIL_ERROR", payload: {status:hasError, text: errorText} })
    }

    /**
     * Checks if the password saved in state is valid and updates the 'PasswordError' object in state accordingly
     */
    const _isValidPassword = () => {
        let hasError = false;
        let errorText = ""

        //If the email field is empty => give error
        if(state.Password.trim().length <= 0){
            hasError = true
            errorText = 'Please fill in required field.'
        }
        dispatch({type: "UPDATE_PASSWORD_ERROR", payload: {status:hasError, text: errorText} })

    }
    //#endregion

    return(
        <LoginContext.Provider value={{
            state,
            ...state,
            enterPassword,
            enterEmail,
            login,
            openForgotPasswordModal,
            toggleResponseModal,
            toggleHidePassword,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

// make sure use
const useLoginContext = () => {
    return useContext(LoginContext)
  }
  
  export { LoginContext, LoginProvider, useLoginContext }

