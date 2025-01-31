import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Box,
  Button,
  MenuItem,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  FormGroup,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useState } from "react";

const schema = yup
  .object({
    nome: yup
      .string()
      .min(5, "O nome do anúncio deve ter pelo menos 5 caracteres.")
      .max(100, "O nome do anúncio pode ter no máximo 100 caracteres.")
      .required("O nome do anúncio é obrigatório."),
    data: yup
      .date()
      .min(
        new Date(),
        "A data de publicação não pode ser anterior à data de hoje."
      )
      .required("A data de publicação é obrigatória."),
    valor: yup
      .number()
      .typeError("O valor deve ser um número válido.")
      .min(1, "O valor deve ser maior ou igual a R$ 1,00.")
      .required("O valor é obrigatório."),
    cidade: yup.string().required("Selecione uma cidade válida."), // Mensagem personalizada
    tipo: yup
      .string()
      .oneOf(["produto", "servico"], "Escolha um tipo válido")
      .required("O tipo é obrigatório"),
    quantidade: yup
      .number()
      .positive("A quantidade deve ser positiva")
      .integer(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const AdForm = ({ onSubmit }: { onSubmit: (data: FormData) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [tipoAnuncio, setTipoAnuncio] = useState<"produto" | "servico">(
    "produto"
  );

  const handleTipoAnuncioChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTipoAnuncio(event.target.value as "produto" | "servico");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,

        justifyContent: "center",
        alignItems: "left", // Centraliza horizontalmente
      }}
    >
      <FormGroup>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Tipo do Anúncio
        </FormLabel>
        <RadioGroup
          row
          name="row-radio-buttons-group"
          value={tipoAnuncio}
          onChange={handleTipoAnuncioChange}
        >
          <FormControlLabel
            value="produto"
            control={<Radio />}
            label="Produto"
          />
          <FormControlLabel
            value="servico"
            control={<Radio />}
            label="Serviço"
          />
        </RadioGroup>
      </FormGroup>

      <TextField
        label="Nome do anúncio"
        {...register("nome")}
        error={!!errors.nome}
        helperText={errors.nome?.message}
        size="small"
      />

      <TextField
        label="Data de publicação"
        type="date"
        {...register("data")}
        error={!!errors.data}
        helperText={errors.data?.message}
        slotProps={{
          inputLabel: {
            shrink: true,
          },
        }}
        size="small"
      />

      <TextField
        label="Valor"
        type="number"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          },
        }}
        {...register("valor")}
        error={!!errors.valor}
        helperText={errors.valor?.message}
        size="small"
      />

      <FormControl error={!!errors.cidade}>
        <InputLabel id="cidade-label">Cidade</InputLabel>
        <Select
          labelId="cidade-label"
          label="Cidade"
          {...register("cidade")}
          error={!!errors.cidade}
          size="small"
        >
          <MenuItem value={10}>São Paulo</MenuItem>
          <MenuItem value={20}>Rio de Janeiro</MenuItem>
          <MenuItem value={30}>Belo Horizonte</MenuItem>
        </Select>
        {errors.cidade && (
          <FormHelperText>{errors.cidade.message}</FormHelperText>
        )}
      </FormControl>

      {tipoAnuncio === "produto" && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <TextField
            select
            label="Categoria"
            {...register("tipo")}
            error={!!errors.tipo}
            helperText={errors.tipo?.message}
            size="small"
            sx={{
              gap: 2,
              width: "100%",
            }}
          >
            <MenuItem value="produto">Produto</MenuItem>
            <MenuItem value="servico">Serviço</MenuItem>
          </TextField>

          <TextField
            select
            label="Modelo"
            {...register("tipo")}
            error={!!errors.tipo}
            helperText={errors.tipo?.message}
            size="small"
            sx={{
              gap: 2,
              width: "100%",
            }}
          >
            <MenuItem value="produto">Produto</MenuItem>
            <MenuItem value="servico">Serviço</MenuItem>
          </TextField>

          <TextField
            select
            label="Condição"
            {...register("tipo")}
            error={!!errors.tipo}
            helperText={errors.tipo?.message}
            size="small"
            sx={{
              gap: 2,
              width: "100%",
            }}
          >
            <MenuItem value="produto">Produto</MenuItem>
            <MenuItem value="servico">Serviço</MenuItem>
          </TextField>

          <TextField
            label="Quantidade"
            type="number"
            {...register("quantidade")}
            error={!!errors.quantidade}
            helperText={errors.quantidade?.message}
            size="small"
            sx={{
              gap: 2,
              width: "100%",
            }}
          />
        </Box>
      )}

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          maxWidth: 450,
          justifyContent: "flex-end",
        }}
      >
        <Button variant="contained" color="inherit" type="reset">
          Limpar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Confirmar
        </Button>
      </Box>
    </Box>
  );
};

export default AdForm;
