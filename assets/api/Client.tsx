import axios from "axios";
import { BASE_URL, API_USERNAME, API_PASSWORD } from '@env';
const client = axios.create({
  baseURL:
    BASE_URL,            //   replace here ur api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  auth: {
    username: API_USERNAME, // Usuario para Basic Auth
    password: API_PASSWORD, // Contraseña para Basic Auth
  },
});

export default client;
