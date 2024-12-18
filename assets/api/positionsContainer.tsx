import client from "./Client";

export const getPositions = async (codigo: string) => {
  try {
    const response = await client.post("App_get_posiciones", {
      codigo: codigo,
    });

    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw new Error("No se pudo obtener las posiciones.");
  }
};
export const getRows = async (codigo: string) => {
  try {
    const response = await client.post("App_get_filas", {
      codigo: codigo,
    });

    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw new Error("No se pudo obtener las fila.");
  }
};
export const getLayers = async (codigo: string) => {
  try {
    const response = await client.post("App_get_capas", {
      codigo: codigo,
    });

    return response.data;
  } catch (error) {
    console.error("Error en la petición:", error);
    throw new Error("No se pudo obtener las capas.");
  }
};
