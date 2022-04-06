let endpoints = require('../endpoints')

const api_url = endpoints.register;

let register = async(_address,_first_name, _last_name, _email, _password) => {
    let userData = {
        address: _address,
        email: _email,
        first_name: _first_name,
        last_name: _last_name,
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

    //ToDo: If success continue to verifiy email
        //temp: login & continue to profile if success

    //If not success => show error
}

module.exports = register;