import AdForm from "../components/AdForm";
import api from "../services/api";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";

const CreateAd = () => {
  const handleFormSubmit = async (data: any) => {
    try {
      const response = await api.post("/anuncios", data);
      console.log("Anúncio cadastrado:", response.data);
      alert("Anúncio cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar anúncio:", error);
      alert("Erro ao cadastrar anúncio. Tente novamente.");
    }
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 600,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Cadastrar Anúncio
        </Typography>
        <AdForm onSubmit={handleFormSubmit} />
      </Box>
    </Container>
  );
};

export default CreateAd;
