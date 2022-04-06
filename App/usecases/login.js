let endpoints = require('../endpoints')

const api_url = endpoints.login;

let login = async(_email, _password) => {
    let userData = {
        email: _email,
        password: _password
    };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
        };

    const response = await fetch(api_url, options );
    const token = await response.text();
    console.log(token)

    //ToDo: If success continue to profile

    //If not success => show error
}


module.exports = login;
