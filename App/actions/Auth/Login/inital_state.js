/**
 * Initial state for login screen
 */ 
 export default class initial_state {
    constructor() 
    {
      this.Loading = false
      this.LoginResponse = ""
      this.showResponseModal = false

      this.Email = ''      //Value of Email Input

      /*Indicates if there is an error concering the Email input and what the error is*/
      this.EmailError = {
        error: false,
        errorText: ' '
      }
      this.Password = ''     //Value of Password Input
      this.HidePassword = true  //Indicates if a password is hidden or shown

      /*Indicates if there is an error concering the Password input and what the error is*/
      this.PasswordError = {
        error: false,
        errorText: ' '
      }
    } 
 } 