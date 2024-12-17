import axios from "axios";
import { BASE_URL } from "@env"; // Importamos la URL base desde el archivo de configuración

export const loginUser = async (user: string, password: string) => {
  try {
    // Realizamos la solicitud POST
    const response = await axios.post(`${BASE_URL}/LoginFlutter`, {
      user,
      password,
    });

    return response.data; // Devolvemos los datos de la respuesta
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw new Error("Error en la autenticación. Verifica tus datos.");
  }
};
