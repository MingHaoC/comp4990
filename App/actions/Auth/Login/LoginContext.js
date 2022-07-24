import React, { useContext, useReducer } from 'react'
import reducer from './loginReducer'
import initial_state from './inital_state'
import { useAppContext } from '../../../context'

const LoginContext = React.createContext()

const init_state = {...new initial_state()}


const LoginProvider = ({children}) => {

    const {loginPOST, setUser} = useAppContext();
    const [state, dispatch] = useReducer(reducer,init_state)
    
    const enterEmail = (value) => {
        dispatch({type: "ENTER_INPUT", payload: {label:"Email", value} })
    }

    const enterPassword = (value) => {
        dispatch({type: "ENTER_INPUT", payload: {label:"Password", value} })
    }

    const login = async() => {
        dispatch({type: "VERIFIY_LOGIN_PRECONDITIONS"})

        if(state.LoginPreconditionsMet){
    
          console.log('loading...')
          //TODO: Create Loading Screen
          let response = { status: 500, text: 'System Error'}
          try {
            response = await loginPOST(state.Email, state.Password) 
          } catch (error) {
          }
          dispatch({type: 'CONFIRM_LOGIN', payload: {...response}})
    
        }
        setUser(true)
        
    }

    const openForgotPasswordModal = () => {
        console.log("TODO")
    }

    return(
        <LoginContext.Provider value={{
            state,
            ...state,
            enterPassword,
            enterEmail,
            login,
            openForgotPasswordModal

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

