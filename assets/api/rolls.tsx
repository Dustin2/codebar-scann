import client from "./Client";

export const rolls = async (codigo: string) => {
  try {
    const response = await client.post("App_get_codigo", {
      codigo: codigo, 
    });

    return response.data; 
  } catch (error) {
    console.error("Error en la petición:", error);
    throw new Error("No se pudo obtener la información del rollo.");
  }
};