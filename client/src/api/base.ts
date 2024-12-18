import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

console.log('Base URL:', axios.defaults.baseURL);