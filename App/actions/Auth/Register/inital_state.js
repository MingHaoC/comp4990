/**
 * Initial state for register page
 */ 
 export default class initial_state {

   constructor() {
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
      /*Indicates error in Password input*/
      this.PasswordError = {
        error: false,
        errorText: ''
      }
    
      this.Verification = '',    //Value of Verification Input
      /*Indicates error in Verification input*/
      this.VerificationError = {
        error: false,
        errorText: ''
      }
    
      /*Response from sending a POST request to Register URL*/
      this.Response = {
        status: 500, 
        text: 'System Error'
      }
    
      this.showModal = false,  //Indicates if the LoginModal should be visible
                               //Modal is used to show POST request response
    
      this.registerPreconditionsMet = false //Indicates if all the requirements have been met to send a POST request to Register
   }
 }