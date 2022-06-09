let api_root = "http://localhost:8080";


//#region USER
let user_root = '/user';

/**POST - Authenticates a user. 
 * 
 * INPUT: Pass a json object in body:
 * {
 *      username: "username"
 *      password: "password"
 * }
 * 
 * OUTPUT: A JWT if successful, an error message otherwise
 * **/
let login_url = api_root+user_root+"/login";

/**POST - Create a user. 
 * 
 * INPUT: Pass a json object in body:
 * {
        address: "address",
        email: "email",
        first_name: "first_name",
        last_name: "last_name",
        password: "password"
 * }
 * 
 * OUTPUT: nothing if successful, an error message otherwise
 * **/
let register_url = api_root+user_root+"/register";

//#endregion

//export
module.exports.api = this.api_root;
module.exports.login = this.login_url;
module.exports.register = this.register_url;
