
 //Maintains state for Register screens
const reducer = (state,action) => {
    switch (action.type) {
        case "SET_HIDE_PASSWORD":{
            state.HidePassword = action.payload
            return {...state}
        }
        case "SET_HIDE_VERIFICATION_PASSWORD":{
            state.HideVerificationPassword = action.payload
            return {...state}
        }
        case "SET_SHOW_RESPONSE_MODAL":{
            state.showResponseModal = action.payload
            return {...state}
        }
        case "SET_RESPONSE_MODAL_CONTENT":{
            state.RegisterResponse = action.payload
            return {...state}
        }
        case "SET_LOADING":{
            state.Loading = action.payload
            return {...state}
        }
        case "SET_FIRSTNAME_ERROR":{
            state.FirstnameError.error = action.payload.error
            state.FirstnameError.errorText = action.payload.errorText
            return {...state}
        }
        case "SET_LASTNAME_ERROR":{
            state.LastnameError.error = action.payload.error
            state.LastnameError.errorText = action.payload.errorText
            return {...state}
        }
        case "SET_EMAIL_ERROR":{
            state.EmailError.error = action.payload.error
            state.EmailError.errorText = action.payload.errorText
            return {...state}
        }
        case "SET_ADDRESS_ERROR":{
            state.AddressError.error = action.payload.error
            state.AddressError.errorText = action.payload.errorText
            return {...state}
        }
        case "SET_PASSWORD_ERROR":{
            state.PasswordError.error = action.payload.error
            state.PasswordError.errorText = action.payload.errorText
            return {...state}
        }
        case "SET_PASSWORD_VERIFICATION_ERROR":{
            state.VerificationError.error = action.payload.error
            state.VerificationError.errorText = action.payload.errorText
            return {...state}
        }
        case 'CHECK_REGISTRATION_PRECONDITIONS':
        {
            //#region Check each field and ensure that they are empty
            const emptyFieldError = 'Please fill in required field.'
            if(!state.Firstname){
                state.FirstnameError.error = true
                state.FirstnameError.errorText = emptyFieldError
            }

            if(!state.Lastname){
                state.LastnameError.error = true
                state.LastnameError.errorText = emptyFieldError
            }

            if(!state.Address){
                state.AddressError.error = true
                state.AddressError.errorText = emptyFieldError
            }

            if(!state.Email){
                state.EmailError.error = true
                state.EmailError.errorText = emptyFieldError
            }

            if(!state.Password){
                state.PasswordError.error = true
                state.PasswordError.errorText = emptyFieldError
            }

            if(!state.Verification){
                state.VerificationError.error = true
                state.VerificationError.errorText = emptyFieldError
            }
            // #endregion
             
            /*Check each field and ensure that there are no errors in order to register */
            if( !state.VerificationError.error    &&
                !state.PasswordError.error        &&
                !state.EmailError.error           &&
                !state.LastnameError.error        &&
                !state.AddressError.error         &&
                !state.FirstnameError.error){
                    state.registerPreconditionsMet = true;
                }

            return {...state};
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


