/**
 * Initial state fo
 */ 
 export default class initial_state {
    constructor() 
    {
      this.Email = '',      //Value of Email Input

      /*Indicates if there is an error concering the Email input and what the error is*/
      this.EmailError = {
        error: false,
        errorText: ' '
      }
      this.Password = ''     //Value of Password Input
    
      /*Indicates if there is an error concering the Password input and what the error is*/
      this.PasswordError = {
        error: false,
        errorText: ' '
      }

      this.LoginPreconditionsMet = false //Indicates if all the requirements have been met to send a POST request to login
    
      this.showModal = false     //Indicates if the LoginModal should be visible
                                 //Modal is used to show POST request response
    
      /*Response from sending a POST request to Login URL*/
      this.Response = {
        status: 500, 
        text: 'System Error'
      }
    } 
 } 