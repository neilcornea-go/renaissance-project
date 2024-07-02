import axios from 'axios';

// BACKEND URLS and Credentials
axios.defaults.withCredentials = true;

// Backend URL Localhost
axios.defaults.baseURL = "http://127.0.0.1:5173";

// Backend URL Production
// axios.defaults.baseURL = "https://api.swapifine.com";