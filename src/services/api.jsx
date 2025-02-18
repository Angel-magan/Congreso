import axios from "axios";

const API_URL = "http://localhost:5000/users/datos"; // Solicitar usuarios

export const getUsuarios = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los usuarios:", error);
    return [];
  }
};
