import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5038",
});

export const criarAnuncio = async (anuncio: {
  Nome: string;
  DataPublicacao: string;
  Valor: number;
  Cidade: string;
  Tipo: string;
  Categoria: string;
  Modelo: string;
  Condicao: string;
  Quantidade: number;
}) => {
  try {
    console.log(JSON.stringify(anuncio));
    const response = await api.post(
      "http://localhost:5038/api/anuncios",
      anuncio
    );
    return response.data;
  } catch (error) {
    console.error("Erro ao criar anúncio:", error);
    throw error;
  }
};

export default api;
