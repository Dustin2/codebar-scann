import client from "../api/Client";
import axios from "axios";

export const loginUser = async (user: string, password: string) => {
  try {
    // Created  instance of FormData
    const formData = new FormData();
    formData.append("user", user);
    formData.append("password", password);

    // Verify format content
    // for (const [key, value] of formData.entries()) {
    //   // console.log(${key}: ${value})
    // }
    const response = await client.post("LoginFlutter", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; 
  } catch (error) {
    console.error("Error en la autenticación:", error);
    if (axios.isAxiosError(error)) {
      console.error("Detalles del error (Axios):", error.response?.data);
    }
    throw new Error("Error en la autenticación. Verifica tus datos.");
  }
};