import axios from "axios";

const client = axios.create({
  baseURL:
    "http://qa.grupohazesa.com/sistema1/index.php/Rest/", //   replace here ur api
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default client;
