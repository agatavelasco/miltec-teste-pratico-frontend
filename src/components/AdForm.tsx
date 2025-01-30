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

const schema = yup
  .object({
    nome: yup
      .string()
      .required("O nome do anúncio deve ter pelo menos 5 caracteres."),
    data: yup
      .number()
      .positive("O valor deve ser positivo")
      .required("O valor é obrigatório"),
    valor: yup.string().required("O valor deve ser maior ou igual a R$ 1,00."),
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

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 450,
        alignItems: "left",
      }}
    >
      <FormGroup>
        <FormLabel id="demo-row-radio-buttons-group-label">
          Tipo do Anúncio
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
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

      <TextField
        select
        label="Categoria"
        {...register("tipo")}
        error={!!errors.tipo}
        helperText={errors.tipo?.message}
        size="small"
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
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          maxWidth: 450,
          alignItems: "flex-end",
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
