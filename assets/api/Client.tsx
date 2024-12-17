import axios from "axios";
import Constants from "expo-constants";
const client = axios.create({
  baseURL: Constants.URLM, //   replace here ur api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
