import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Table, Button } from "react-bootstrap";
import api from "./api"; // Configuração do Axios

const CadastroVeiculo = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [veiculos, setVeiculos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Carregar veículos e fornecedores do backend ao montar o componente
  useEffect(() => {
    api.get("/veiculos")
      .then((response) => setVeiculos(response.data))
      .catch((error) => console.error("Erro ao carregar veículos:", error));
    api.get("/fornecedores")
      .then((response) => setFornecedores(response.data))
      .catch((error) => console.error("Erro ao carregar fornecedores:", error));
  }, []);

  // Função para cadastrar ou atualizar veículos
  const onSubmit = (data) => {
    if (editIndex !== null) {
      const veiculo = veiculos[editIndex];
      api.put(`/veiculos/${veiculo.id}`, data) // Atualizar veículo no backend
        .then(() => {
          const updatedVeiculos = [...veiculos];
          updatedVeiculos[editIndex] = { ...veiculo, ...data };
          setVeiculos(updatedVeiculos);
          setEditIndex(null);
          reset();
        })
        .catch((error) => console.error("Erro ao atualizar veículo:", error));
    } else {
      api.post("/veiculos", data) // Cadastrar novo veículo no backend
        .then((response) => {
          setVeiculos([...veiculos, response.data]);
          reset();
        })
        .catch((error) => console.error("Erro ao cadastrar veículo:", error));
    }
  };

  // Função para preencher o formulário com os dados do veículo para edição
  const handleEdit = (index) => {
    const veiculo = veiculos[index];
    Object.keys(veiculo).forEach((key) => setValue(key, veiculo[key]));
    setEditIndex(index);
  };

  // Função para excluir veículos
  const handleDelete = (index) => {
    const veiculo = veiculos[index];
    api.delete(`/veiculos/${veiculo.id}`) // Enviar requisição DELETE para o backend
      .then(() => {
        setVeiculos(veiculos.filter((_, i) => i !== index)); // Atualizar estado local
      })
      .catch((error) => {
        console.error("Erro ao excluir veículo:", error);
        alert("Erro ao excluir veículo. Tente novamente.");
      });
  };

  return (
    <Container className="form-container">
      <div className="card p-4 shadow">
        <h2>Cadastro de Veículo</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Placa:</label>
            <input
              type="text"
              className={`form-control ${errors.placa ? "is-invalid" : ""}`}
              placeholder="ABC-1234"
              {...register("placa", {
                required: "A placa é obrigatória",
                pattern: {
                  value: /^[A-Z]{3}-\d{4}$/,
                  message: "Placa inválida. Use o formato ABC-1234"
                }
              })}
            />
            {errors.placa && <div className="invalid-feedback">{errors.placa.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Modelo:</label>
            <input
              type="text"
              className={`form-control ${errors.modelo ? "is-invalid" : ""}`}
              placeholder="Corolla XEI 2.0"
              {...register("modelo", { required: "O modelo é obrigatório" })}
            />
            {errors.modelo && <div className="invalid-feedback">{errors.modelo.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Marca:</label>
            <input
              type="text"
              className={`form-control ${errors.marca ? "is-invalid" : ""}`}
              placeholder="Toyota"
              {...register("marca", { required: "A marca é obrigatória" })}
            />
            {errors.marca && <div className="invalid-feedback">{errors.marca.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Ano de Fabricação:</label>
            <input
              type="number"
              className={`form-control ${errors.ano ? "is-invalid" : ""}`}
              placeholder="2020"
              {...register("ano", {
                required: "O ano é obrigatório",
                min: { value: 1900, message: "Ano inválido. O ano deve ser maior ou igual a 1900" },
                max: { value: new Date().getFullYear(), message: `Ano inválido. O ano deve ser menor ou igual a ${new Date().getFullYear()}` }
              })}
            />
            {errors.ano && <div className="invalid-feedback">{errors.ano.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Cor:</label>
            <input
              type="text"
              className={`form-control ${errors.cor ? "is-invalid" : ""}`}
              placeholder="Preto"
              {...register("cor", { required: "A cor é obrigatória" })}
            />
            {errors.cor && <div className="invalid-feedback">{errors.cor.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Fornecedor:</label>
            <select
              className={`form-control ${errors.fornecedor_id ? "is-invalid" : ""}`}
              {...register("fornecedor_id", { required: "O fornecedor é obrigatório" })}
            >
              <option value="">Selecione um fornecedor</option>
              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>
            {errors.fornecedor_id && <div className="invalid-feedback">{errors.fornecedor_id.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editIndex !== null ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>

      <div className="card p-4 shadow mt-4">
        <h3>Veículos Cadastrados</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Placa</th>
              <th>Modelo</th>
              <th>Marca</th>
              <th>Ano</th>
              <th>Cor</th>
              <th>Fornecedor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {veiculos.map((veiculo, index) => (
              <tr key={index}>
                <td>{veiculo.placa}</td>
                <td>{veiculo.modelo}</td>
                <td>{veiculo.marca}</td>
                <td>{veiculo.ano}</td>
                <td>{veiculo.cor}</td>
                <td>{veiculo.fornecedor}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}>Editar</Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>Excluir</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default CadastroVeiculo;
