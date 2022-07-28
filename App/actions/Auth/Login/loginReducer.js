/**
 * Maintains the state for the login screen
 */
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_HIDE_PASSWORD":{
            state.HidePassword = action.payload
            return {...state}
        }
        case "SET_SHOW_RESPONSE_MODAL":{
            state.showResponseModal = action.payload
            return {...state}
        }
        case "SET_RESPONSE_MODAL_CONTENT":{
            state.LoginResponse = action.payload
            return {...state}
        }
        case "SET_LOADING":{
            state.Loading = action.payload
            return {...state}
        }
        case "UPDATE_EMAIL_ERROR": {
            state.EmailError.error = action.payload.status
            state.EmailError.errorText = action.payload.text    
            return {...state}   
        }
        case "UPDATE_PASSWORD_ERROR": {
            state.PasswordError.error = action.payload.status
            state.PasswordError.errorText = action.payload.text    
            return {...state}   
        }
        case "ENTER_INPUT":
        {
            const label = action.payload.label
            const value = action.payload.value.trim()

            return {...state, [label]: value, [`${label}Error`]: {error: false, errorText: ''}}
        }
    }
    
    throw new Error('No matching action type.');
}
export default reducer