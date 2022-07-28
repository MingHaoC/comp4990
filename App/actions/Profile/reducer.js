/*Manages Profile screen state */
const reducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_EDIT_FIRSTNAME":{
            state.EditFirstname = action.payload
            return {...state}
        }
            
        case "UPDATE_EDIT_LASTNAME":{
            state.EditLastname = action.payload
            return {...state}
        }

        case "UPDATE_EDIT_PHONENUMBER":{
            state.EditPhonenumber = action.payload
            return {...state}
        }

        case "UPDATE_EDIT_ADDRESS":{
            state.EditAddress = action.payload
            return {...state}
        }

        case "UPDATE_FIRSTNAME":{
            state.Firstname = action.payload
            return {...state}
        }
            
        case "UPDATE_LASTNAME":{
            state.Lastname = action.payload
            return {...state}
        }

        case "UPDATE_PHONENUMBER":{
            state.Phonenumber = action.payload
            return {...state}
        }

        case "UPDATE_ADDRESS":{
            state.Address = action.payload
            return {...state}
        }

        case "SET_LOADING":{
            state.Loading = action.payload
            return {...state}
        }

        case "SET_EDIT_LOADING":{
            state.EditLoading = action.payload
            return {...state}
        }
    }
    throw new Error('no matching action type')
}

export default reducer