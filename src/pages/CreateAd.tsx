import AdForm from "../components/AdForm";
import api from "../services/api";
import { Box, Typography } from "@mui/material";
import { Container } from "@mui/material";

const CreateAd = () => {
  const handleFormSubmit = async (data: any) => {
    console.log(data);
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
        <AdForm onSubmit={handleFormSubmit} />
      </Box>
    </Container>
  );
};

export default CreateAd;
