const reducer = (state, action) => {
    switch (action.type) {
        case "VERIFIY_LOGIN_PRECONDITIONS":
        {    
            // #region ensure that required fields are filled
            const emptyFieldError = 'Please fill in required field.'

            if(!state.Email){
                state.EmailError.error = true
                state.EmailError.errorText = emptyFieldError
            }
            if(!state.Password){
                state.PasswordError.error = true
                state.PasswordError.errorText = emptyFieldError
            }
            // #endregion 

            /*Check each field and ensure that there are no errors in order to login */
            if( !state.PasswordError.error && !state.EmailError.error){
                state.LoginPreconditionsMet = true
            }
            return {...state};
        }
        case "CONFIRM_LOGIN":
        {
            state.Response = {status: action.payload.status, text: action.payload.text}
            return reducer({...state}, {type: 'SHOW_MODAL'})
        }
        case "SHOW_MODAL":
        {
            return {...state, showModal: true}
        }
        case "CLOSE_MODAL":
        {
            return {...state, showModal: false}
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