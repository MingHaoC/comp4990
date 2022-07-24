
 
 // reducer function
const reducer = (state,action) => {


    switch (action.type) {
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
        case "CONFIRM_REGISTRATION":
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
        case "CREATE_PASSWORD":
        {

            /*Changes if there was any error*/
            let errorText = ''
            let error = false;

            /*Identifies password in state*/
            const label = "Password"
            const value = action.payload

            //Ensure passowrd meets length requirements
            const requirement_1 = value.trim().length >= 8
            if(!requirement_1){
                error = true;
                errorText += "Password must be at least 8 characters long.\n"
            }

            //Ensure password meets number requirements
            const requirement_2 = hasNumbers(value)
            if(!requirement_2){
                error = true;
                errorText += "Password must contain a number.\n"
            }

            //Ensure password meets letter requirments
            const requirement_3 = hasLetter(value)
            if(!requirement_3){
                error = true;
                errorText += "Password must contain a number.\n"
            }
            return  {...state, PasswordError:{errorText, error}}
        }
        case "VERIFIY_PASSWORD_MATCHES":
        {
            /*Changes if there was any error*/
            let errorText = ''
            let error = false;

            /*Identiifiy state field*/
            const label = "Verification"
            const value = action.payload

            //Ensure that the verification matches the password
            if(state.Password != value){
                error = true;
                errorText = "Passwords don't match."
            }
            return  {...state, VerificationError:{error, errorText}}
        }
    }
    throw new Error('No matching action type.');
}

// #region Utility Functions

function hasNumbers(t)
{
    var regex = /\d/g;
    return regex.test(t);
}   

function hasLetter(t)
{
    var regex =  /[a-zA-Z]/g;;
    return regex.test(t);
} 
// #endregion

export default reducer


