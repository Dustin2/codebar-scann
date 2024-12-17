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

// const clientLogin = axios.create({
//   baseURL: "https://your-api-url.com", // URL base de tu API
//   headers: {
//     Authorization: "Basic Og==", // Tu token o header de autorización
//   },
// });


export default client;

