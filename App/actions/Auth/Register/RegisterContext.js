import React, { useContext, useReducer } from 'react'
import reducer from './registerReducer'
import initial_state from './inital_state'
import { useAppContext } from '../../../context'

const RegisterContext = React.createContext()

const init_state = {...new initial_state()}


const RegisterProvider = ({children}) => {
    const {registerPOST} = useAppContext();

    const [state, dispatch] = useReducer(reducer, init_state)

    const registerUser = async() => {
        dispatch({type: 'CHECK_REGISTRATION_PRECONDITIONS'})

        if(state.registerPreconditionsMet)
        {
          console.log('loading...')
          //ToDo: Create Loading Screen
          let response = {status: 500, text: 'System Error'}
          try {
             response = await registerPOST(Address,Firstname,Lastname,Email,Password);

          } catch (error) {
            
          }
          dispatch({type: 'CONFIRM_REGISTRATION', payload: {...response}})
        }
    }

    const enterFirstname = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Firstname"}})
    }

    const enterLastname = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Lastname"}})
    }

    const enterAddress = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Address"}})
    }

    const enterEmail = (value) => {
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Email"}})
    }

    const enterPassword = (value) => {
        dispatch({type:"CREATE_PASSWORD", payload: value})
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Password"}})
    }

    const enterPasswordVerification = (value) => {
        dispatch({type:"VERIFIY_PASSWORD_MATCHES", payload: value})
        dispatch({type:"ENTER_INPUT", payload: {value: value, label: "Verification"}})
    }

    const showModal = () => {
        dispatch({type: "OPEN_MODAL"})

    }

    const closeModal = () => {
        dispatch({type: "CLOSE_MODAL"})
    }
    return(
        <RegisterContext.Provider value={{
            ...state,
            state,
            registerUser,
            enterFirstname,
            enterLastname,
            enterEmail,
            enterAddress,
            enterPassword,
            enterPasswordVerification,
            showModal,
            closeModal
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

