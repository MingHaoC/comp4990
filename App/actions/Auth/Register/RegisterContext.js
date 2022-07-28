import React, { useContext, useReducer } from 'react'
import reducer from './registerReducer'
import initial_state from './inital_state'
import { useAppContext } from '../../../context'
import jwtDecode from 'jwt-decode'

const RegisterContext = React.createContext()

const init_state = {...new initial_state()}

/**
 * Actions for Register screen
 */
const RegisterProvider = ({children}) => {
    const {
        registerPOST,    //POST action
        loginPOST,
        setUser
    } = useAppContext();

    //maintains state for Register screen
    const [state, dispatch] = useReducer(reducer, init_state)

    /**
     * Attempts to register a user
     * Ensures each input is valid
     * If any input is invalid => give an input error
     * If it is valid then POST data
     * If POST fails then display error modal
     * If POST is success then attempt to login user
     * If login success => navigate to home screen
     */
    const registerUser = async() => {

        //Check all is valid
        let isValid = _checkAllIsValid()
        if(isValid)
        {
            dispatch({type: "SET_LOADING", payload: true})


            /*Try POST regsiter data */
            let response = { status: 500, content: 'System Error'}
            try {
                response = await registerPOST(state.Address,state.Firstname,state.Lastname,state.Email,state.Password);

            } catch (error) {
                console.log(error)
            }

            if(response.status == 200)
            {
                /*Try login */
                try {
                    let loginResponse = await loginPOST(state.Email, state.Password) 
                    if(loginResponse.status == 200){
                        setUser(jwtDecode(loginResponse.content))
                    }
                } catch (error) {
                    console.log(error)
                }

            }else{
                //open response modal if error
                toggleResponseModal(`${response.content}`)
            }
            _resetInputs()
            dispatch({type: "SET_LOADING", payload: false})
        }
    }

    /**
     * Retrieves the value of the firstname onTextChange provided in the firstname input  and updates the state to reflect the changed firstname value
     * @param {string} value retreived from the user in the firstname input onTextChange
     */
    const enterFirstname = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Firstname"}})
    }

    /**
     * Retrieves the value of the lastname onTextChange provided in the lastname input  and updates the state to reflect the changed lastname value
     * @param {string} value retreived from the user in the lastname input onTextChange
     */
    const enterLastname = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Lastname"}})
    }

    /**
     * Retrieves the value of the address onTextChange provided in the address input  and updates the state to reflect the changed address value
     * @param {string} value retreived from the user in the address input onTextChange
     */
    const enterAddress = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Address"}})
    }

    /**
     * Retrieves the value of the email onTextChange provided in the email input  and updates the state to reflect the changed email value
     * @param {string} value value retreived from the user in the email input onTextChange
     */
    const enterEmail = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Email"}})
    }

    /**
     * Retrieves the value of the password onTextChange provided in the password input  and updates the state to reflect the changed password value
     * @param {string} value retreived from the user in the password input onTextChange
     */
    const enterPassword = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Password"}})
        passwordMeetsRequirements()
        verificationMatchesPassword()
    }

    /**
     * Retrieves the value of the passwordVerification onTextChange provided in the passwordVerification input  and updates the state to reflect the changed passwordVerification value
     * @param {string} value retreived from the user in the passwordVerification input onTextChange
     */
    const enterPasswordVerification = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Verification"}})
        verificationMatchesPassword()
    }

    /**
     * Checks if the password value saved in state meets the listed requirements. 
     * Updates the state of PasswordError accordingly
     */
    const passwordMeetsRequirements = () => {
        const value = state.Password

        let error = false
        let errorText = ""

        /*REQUIREMENT 1: At least 8 characters*/
        const requirement_1 = value.trim().length >= 8
        if(!requirement_1){
            error = true;
            errorText += "Password must be at least 8 characters long.\n"
        }
        
        /*REQUIREMENT 2: At least 1 letter*/
        let letterRegex =  /[a-zA-Z]/g;
        const requirement_2 = letterRegex.test(value)
        if(!requirement_2){
            error = true;
            errorText += "Password must contain a letter.\n"
        }

        /*REQUIREMENT 3: At least 1 number*/
        var numberRegex = /\d/;
        const requirement_3 = numberRegex.test(value)
        if(!requirement_3){
            error = true;
            errorText += "Password must contain a number.\n"
        }
        dispatch({type:"SET_PASSWORD_ERROR", payload:{error,errorText}})
    }

    /**
     * Checks if a password verification value matches the password value saved in state
     * Updates the state of VerificationError accordingly
     */
    const verificationMatchesPassword = () => {
        let error = false
        let errorText = ""

        if(state.Password != state.Verification){
            error = true
            errorText = "Passwords don't match."
        }

        dispatch({type:"SET_PASSWORD_VERIFICATION_ERROR", payload: {error,errorText}})
    }
    /**
     * Sets the state of 'HidePassword' contary to the current state
     */
     const toggleHidePassword = () => {
        dispatch({type:"SET_HIDE_PASSWORD", payload: !state.HidePassword})
    }

    /**
     * Sets the state of 'HidePassword' contary to the current state
     */
    const toggleHideVerifcationPassword = () => {
        dispatch({type:"SET_HIDE_VERIFICATION_PASSWORD", payload: !state.HideVerificationPassword})
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
    //#endregion Private
    /**
     * Sets all inputs on the Register screen to an empty string
     */
    const _resetInputs = () => {
        enterAddress("")
        enterEmail("")
        enterFirstname("")
        enterLastname("")
        enterPassword("")
        enterPassword("")
    }

    /**
     * Checks if inputs are invalid 
     * @param {string} label input label
     */
    const _isValidInput = (label) => {
        let error = false
        let errorText = ""

        //If the email field is empty => give error
        if(state.Password.trim().length <= 0){
            error = true
            errorText = 'Please fill in required field.'
        }
        dispatch({type: `SET_${label.toUpperCase()}_ERROR`, payload: {error, errorText} })
    }

    /**
     * Checks if firstname input is valid and sets FirstnameError accordingly
     */
    const _isValidFirstname = () => {
        _isValidInput("firstname")
    }

    /**
     * Checks if lastname input text is valid and sets LastnameError accordingly
     */
    const _isValidLastname = () => {
        _isValidInput("lastname")
    }

    /**
     * Checks if addresss input text is valid and sets AddressError accordingly
     */
    const _isValidAddress = () => {
        _isValidInput("address")
    }

    /**
     * Checks if email input is valid and sets EmailError accordingly
     */
    const _isValidEmail = () => {
        _isValidInput("email")
    }

    /**
     * Checks if password input text is valid and sets PasswordError accordingly
     */
    const _isValidPassword = () => {
        if(state.Password.trim().length <= 0){
            _isValidInput("password")
        }
        verificationMatchesPassword()    
    }

    /**
     * Checks if password verification input text is valid and sets VerificationError accordingly
     */
    const _isValidPasswordVerification = () => {
        if(state.Verification.trim().length <= 0){
            _isValidInput("password_verification")
        }
        verificationMatchesPassword()
    }

    /**
     * Checks the validity of each input and updates the error associated with them in state accordingly
     * @returns true if all inputs are valid, false otherwise
     */
    const _checkAllIsValid = () => {
        _isValidAddress()
        _isValidEmail()
        _isValidFirstname()
        _isValidLastname()
        _isValidPasswordVerification()
        _isValidPassword()

        return  !state.PasswordError.error && 
                !state.VerificationError.error && 
                !state.EmailError.error && 
                !state.FirstnameError.error && 
                !state.LastnameError.error && 
                !state.AddressError.error
    }
    //#endregion
    return(
        <RegisterContext.Provider value={{
            ...state,
            registerUser,
            enterFirstname,
            enterLastname,
            enterEmail,
            enterAddress,
            enterPassword,
            enterPasswordVerification,
            passwordMeetsRequirements,
            verificationMatchesPassword,
            toggleHideVerifcationPassword,
            toggleHidePassword,
            toggleResponseModal,
            toggleResponseModal
        }}>
            {children}
        </RegisterContext.Provider>
    )
} 


// make sure use
const useRegisterContext = () => {
    return useContext(RegisterContext)
  }
  
  export { RegisterContext, RegisterProvider, useRegisterContext }

