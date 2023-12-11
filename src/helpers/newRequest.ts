import axios from 'axios';

// THIS SHOULD BE FALSE IN PRODUCTION
const isLocal = true;

const url = isLocal
  ? 'http://localhost:3001/api'
  : 'https://titan-backend-8cc1ed6f2c92.herokuapp.com/api';

const newRequest = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default newRequest;
