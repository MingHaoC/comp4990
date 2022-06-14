const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
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
                    console.log('Post Data')
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