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
    cidade: yup.string().required("Selecione uma cidade válida."),
    categoria: yup.string().required("Selecione uma categoria válida."),
    modelo: yup.string().required("Selecione um modelo válido."),
    condicao: yup.string().required("Selecione uma condição válida."),

    quantidade: yup
      .number()
      .positive("A quantidade deve ser positiva")
      .integer(),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

interface AdFormProps {
  onSubmit: (data: FormData) => void;
  tipoAnuncio: string;
  handleTipoAnuncioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AdForm: React.FC<AdFormProps> = ({
  onSubmit,
  tipoAnuncio,
  handleTipoAnuncioChange,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const handleReset = () => {
    reset({
      nome: "",
      data: "",
      valor: "",
      cidade: "",
      categoria: "",
      modelo: "",
      condicao: "",
      quantidade: "",
    });
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
        alignItems: "left",
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
            value="Produto"
            control={<Radio />}
            label="Produto"
          />
          <FormControlLabel
            value="Servico"
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
          defaultValue=""
        >
          <MenuItem value={"São Paulo"}>São Paulo</MenuItem>
          <MenuItem value={"Rio de Janeiro"}>Rio de Janeiro</MenuItem>
          <MenuItem value={"Belo Horizonte"}>Belo Horizonte</MenuItem>
        </Select>
        {errors.cidade && (
          <FormHelperText>{errors.cidade.message}</FormHelperText>
        )}
      </FormControl>

      {tipoAnuncio === "Produto" && (
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
            {...register("categoria")}
            error={!!errors.categoria}
            helperText={errors.categoria?.message}
            size="small"
            sx={{
              width: "100%",
            }}
            defaultValue=""
          >
            <MenuItem value="Eletrônicos">Eletrônicos</MenuItem>
            <MenuItem value="Vestuário">Vestuário</MenuItem>
            <MenuItem value="Móveis">Móveis</MenuItem>
          </TextField>

          <TextField
            select
            label="Modelo"
            {...register("modelo")}
            error={!!errors.modelo}
            helperText={errors.modelo?.message}
            size="small"
            sx={{
              width: "100%",
            }}
            defaultValue=""
          >
            <MenuItem value="Smart TV UltraView 4K 55">
              Smart TV UltraView 4K 55
            </MenuItem>
            <MenuItem value="Jaqueta Puffer Windproof">
              Jaqueta Puffer Windproof
            </MenuItem>
            <MenuItem value="Mesa de Jantar Madeira">
              Mesa de Jantar Madeira
            </MenuItem>
          </TextField>

          <TextField
            select
            label="Condição"
            {...register("condicao")}
            error={!!errors.condicao}
            helperText={errors.condicao?.message}
            size="small"
            sx={{
              width: "100%",
            }}
            defaultValue=""
          >
            <MenuItem value="Novo">Novo</MenuItem>
            <MenuItem value="Usado">Usado</MenuItem>
            <MenuItem value="Seminovo">Seminovo</MenuItem>
          </TextField>

          <TextField
            label="Quantidade"
            type="number"
            {...register("quantidade")}
            error={!!errors.quantidade}
            helperText={errors.quantidade?.message}
            size="small"
            sx={{
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
        <Button
          variant="contained"
          color="inherit"
          type="reset"
          onClick={handleReset}
        >
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
