// let api_root = "http://localhost:8080";


// //#region USER
// let user_root = '/user';

// /**POST - Authenticates a user. 
//  * 
//  * INPUT: Pass a json object in body:
//  * {
//  *      username: "username"
//  *      password: "password"
//  * }
//  * 
//  * OUTPUT: A JWT if successful, an error message otherwise
//  * **/
// let login_url = api_root+user_root+"/login";

// /**POST - Create a user. 
//  * 
//  * INPUT: Pass a json object in body:
//  * {
//         address: "address",
//         email: "email",
//         first_name: "first_name",
//         last_name: "last_name",
//         password: "password"
//  * }
//  * 
//  * OUTPUT: nothing if successful, an error message otherwise
//  * **/
// let register_url = api_root+user_root+"/register";

// //#endregion

// //export
// module.exports.api = this.api_root;
// module.exports.login = this.login_url;
// module.exports.register = this.register_url;



// let endpoints = require('../endpoints')

// const api_url = endpoints.login;

// let login = async(_email, _password) => {
//     let userData = {
//         email: _email,
//         password: _password
//     };
//     const options = {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData)
//         };

//     const response = await fetch(api_url, options );
//     const token = await response.text();
//     console.log(token)

//     //ToDo: If success continue to profile

//     //If not success => show error
// }


// module.exports = login;


// let endpoints = require('../endpoints')

// const api_url = endpoints.register;

// let register = async(_address,_first_name, _last_name, _email, _password) => {
//     let userData = {
//         address: _address,
//         email: _email,
//         first_name: _first_name,
//         last_name: _last_name,
//         password: _password
//     };
//     const options = {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData)
//         };

//     const response = await fetch(api_url, options );

//     //ToDo: If success continue to verifiy email
//         //temp: login & continue to profile if success

//     //If not success => show error
// }

// module.exports = register;