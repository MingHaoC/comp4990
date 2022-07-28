/**
 * Initial state for Register screen
 */ 
 export default class initial_state {

   constructor() {
      this.Loading = false
      this.showResponseModal = false
      this.RegisterResponse = ""

      this.Firstname = '',    //Value of Firstname Input

      /*Indicates error in Firstname input*/
      this.FirstnameError = {
          error: false,
          errorText: ''
      },
    
      this.Lastname = '',    //Value of Lastname Input
      
      /*Indicates error in Lastname input*/
      this.LastnameError = {
        error: false,
        errorText: ''
      }
    
      this.Address = '',     //Value of Address Input
      
      /*Indicates error in Address input*/
      this.AddressError = {
        error: false,
        errorText: ''
      }
    
      this.Email = '',       //Value of Email Input
      /*Indicates error in Email input*/
      this.EmailError = {
        error: false,
        errorText: ''
      }
    
      this.Password = '',     //Value of Password Input
      this.HidePassword = true
      /*Indicates error in Password input*/
      this.PasswordError = {
        error: false,
        errorText: ''
      } 
    
      this.Verification = '',    //Value of Verification 
      this.HideVerificationPassword = true
      /*Indicates error in Verification input*/
      this.VerificationError = {
        error: false,
        errorText: ''
      }
   }
 }