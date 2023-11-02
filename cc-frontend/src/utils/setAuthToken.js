import axios from 'axios';

const setAuthToken = token => {
    console.log("token in setAuthToken", token)
    if (token) {
        // Set the 'auth' header with the token value
        axios.defaults.headers.common['x-auth-token'] = token;
        sessionStorage.setItem('token', token)
        console.log('token', token)
        // console.log(axios.defaults.headers.common['x-auth-token'])
    } else {
        console.log('no token')
        // If no token is provided, remove the 'auth' header
        delete axios.defaults.headers.common['x-auth-token'];
        console.log('else axios')
    }
};

export default setAuthToken;
