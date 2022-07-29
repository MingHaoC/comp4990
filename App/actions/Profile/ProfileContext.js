import initial_state from "./initial_state"
import reducer from "./reducer"
import React, { useContext, useReducer, useEffect } from 'react'
import { useAppContext } from '../../context'
import { FindEventContext } from "../Find Events/FindEventsContext"

const ProfileContext = React.createContext()


const init_state = initial_state


const ProfileProvider = ({children}) => {
    const {
        fetchEventList,
        getUserGET,
        updateProfilePOST,
        user
    } = useAppContext()
    
    const [state, dispatch] = useReducer(reducer, init_state)

    /**
     * Updates the state of EditFirstname to refelct the value in the EditFirstName text input
     * @param {string} value provided by user in edit first name inout
     */
    const enterEditFirstname = (value) => {
        dispatch({type: "UPDATE_EDIT_FIRSTNAME", payload: value})
    }

    /**
     * Change the state to reflect the value in EditLastname input
     * @param {string} value provided by the user in the the edit last name input
     */
    const enterEditLastname = (value) => {
        dispatch({type: "UPDATE_EDIT_LASTNAME", payload: value})
    }

    /**
     * Updates the state of Profile to reflect the value of edit address provided by the user in the edit address input
     * @param {string} value address provided by the user in the edit address input
     */
    const enterEditAddress = (value) => {
        dispatch({type: "UPDATE_EDIT_ADDRESS", payload: value})
    }

    /**
     * Updates the value of EditPhonenumber saved in state to reflect the value in edit phone number input
     * @param {string} value provided by user in edit phone number input
     */
    const enterEditPhonenumber = (value) => {
        dispatch({type: "UPDATE_EDIT_PHONENUMBER", payload: value})

    }

    /**
     * Gets the edit values from state and attempts to update them in the server
     * Reset Edit Account and go to ProfileOverview screen
     */
    const saveAccount = async() => {
        dispatch({type: "SET_LOADING", payload: true})
        dispatch({type: "SET_EDIT_LOADING", payload: true})
        await updateProfilePOST(user.id, state.EditPhonenumber, state.EditLastname, state.EditAddress, state.EditPhonenumber)
        dispatch({type: "SET_LOADING", payload: false})
        dispatch({type: "SET_EDIT_LOADING", payload: false})

    }

    const getUser = async() => {
        try {
            const response = await getUserGET(user.sub)
            console.log(response)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        dispatch({type: "UPDATE_FIRSTNAME", payload: `${user.name.split(' ')[0]}`})
        dispatch({type: "UPDATE_LASTNAME", payload: `${user.name.split(' ')[1]}`})
        getUser()
    },[])



    return(
        <ProfileContext.Provider value={{
            ...state,
            enterEditFirstname,
            enterEditLastname,
            enterEditPhonenumber,
            enterEditAddress,
            saveAccount
        }}>
            {children}
        </ProfileContext.Provider>
    )
}

// make sure use
const useProfileContext = () => {
    return useContext(ProfileContext)
  }
  
  export { ProfileContext, ProfileProvider, useProfileContext }

