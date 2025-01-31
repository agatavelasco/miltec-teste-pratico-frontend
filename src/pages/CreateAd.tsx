import { useState } from "react";
import AdForm from "../components/AdForm";
import { criarAnuncio } from "../services/api";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";

const CreateAd = () => {
  const [tipoAnuncio, setTipoAnuncio] = useState<"Produto" | "Servico">(
    "Produto"
  );

  const handleTipoAnuncioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoAnuncio(event.target.value as "Produto" | "Servico");
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await criarAnuncio({
        Nome: data.nome,
        DataPublicacao: data.data.toISOString(),
        Valor: data.valor,
        Cidade: data.cidade,
        Tipo: tipoAnuncio,
        Categoria: data.categoria,
        Modelo: data.modelo,
        Condicao: data.condicao,
        Quantidade: data.quantidade || 1,
      });
      console.log("Anúncio cadastrado:", response);
      alert("Anúncio cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar anúncio:", error);
      alert("Erro ao cadastrar anúncio. Tente novamente.");
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          width: "50%",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Inclusão de Anúncio
        </Typography>
        <AdForm
          onSubmit={handleFormSubmit}
          tipoAnuncio={tipoAnuncio}
          handleTipoAnuncioChange={handleTipoAnuncioChange}
        />
      </Box>
    </Container>
  );
};

export default CreateAd;
