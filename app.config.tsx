import * as dotenv from "dotenv";
import { ExpoConfig, ConfigContext } from "@expo/config";

dotenv.config(); // Carga el archivo .env

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  extra: {
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
    url: process.env.URL,
    cookie: process.env.COOKIE,
    urlm: process.env.URLM,
  },
});
