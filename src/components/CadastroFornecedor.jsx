import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { cnpj } from "cpf-cnpj-validator";
import { Container, Table, Button } from "react-bootstrap";
import "../styles/FormStyle.css"; // Estilos adicionais

const CadastroFornecedor = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [fornecedores, setFornecedores] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleTelefoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
    if (value.length <= 2) {
      value = `(${value}`;
    } else if (value.length <= 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
    }
    e.target.value = value;
  };

  const handleCnpjChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove tudo que não for número
  
    if (value.length <= 2) {
      value = value.slice(0, 2); // Exibe os primeiros 2 dígitos
    } else if (value.length <= 5) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}`; // Formato xx.xxx
    } else if (value.length <= 8) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}`; // Formato xx.xxx.xxx
    } else if (value.length <= 12) {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}`; // Formato xx.xxx.xxx/xxxx
    } else {
      value = `${value.slice(0, 2)}.${value.slice(2, 5)}.${value.slice(5, 8)}/${value.slice(8, 12)}-${value.slice(12, 14)}`; // Formato xx.xxx.xxx/xxxx-xx
    }
  
    e.target.value = value;
  };

  const onSubmit = (data) => {
    if (editIndex !== null) {
      const updatedFornecedores = [...fornecedores];
      updatedFornecedores[editIndex] = data;
      setFornecedores(updatedFornecedores);
      setEditIndex(null);
    } else {
      setFornecedores([...fornecedores, data]);
    }
    reset();
  };

  const handleEdit = (index) => {
    const fornecedor = fornecedores[index];
    Object.keys(fornecedor).forEach((key) => setValue(key, fornecedor[key]));
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setFornecedores(fornecedores.filter((_, i) => i !== index));
  };

  return (
    <Container className="form-container">
      <div className="card p-4 shadow">
        <h2>Cadastro de Fornecedor</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Nome do Fornecedor:</label>
            <input
              type="text"
              className={`form-control ${errors.nome ? "is-invalid" : ""}`}
              placeholder="João da Silva"
              {...register("nome", { required: "O nome é obrigatório" })}
            />
            {errors.nome && <div className="invalid-feedback">{errors.nome.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">CNPJ:</label>
            <input
              type="text"
              className={`form-control ${errors.cnpj ? "is-invalid" : ""}`}
              placeholder="12.345.678/0001-90"
              {...register("cnpj", {
                required: "O CNPJ é obrigatório",
                validate: (value) => cnpj.isValid(value) || "CNPJ inválido",
              })}
              onInput={handleCnpjChange}
            />
            {errors.cnpj && <div className="invalid-feedback">{errors.cnpj.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Endereço:</label>
            <input
              type="text"
              className={`form-control ${errors.endereco ? "is-invalid" : ""}`}
              placeholder="Rua das Indústrias, 123, São Paulo - SP"
              {...register("endereco", { required: "O endereço é obrigatório" })}
            />
            {errors.endereco && <div className="invalid-feedback">{errors.endereco.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone:</label>
            <input
              type="text"
              className={`form-control ${errors.telefone ? "is-invalid" : ""}`}
              placeholder="(11) 98765-4321"
              {...register("telefone", {
                required: "O telefone é obrigatório",
                pattern: {
                  value: /^\(\d{2}\) \d{5}-\d{4}$/,
                  message: "Telefone inválido. Use o formato (11) 98765-4321",
                },
              })}
              onInput={handleTelefoneChange}
            />
            {errors.telefone && <div className="invalid-feedback">{errors.telefone.message}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="joao@email.com"
              {...register("email", {
                required: "O e-mail é obrigatório",
                pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "E-mail inválido" },
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {editIndex !== null ? "Atualizar" : "Cadastrar"}
          </button>
        </form>
      </div>

      <div className="card p-4 shadow mt-4">
        <h3>Fornecedores Cadastrados</h3>
        <div className="table-container">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>Endereço</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fornecedores.map((fornecedor, index) => (
                <tr key={index}>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.cnpj}</td>
                  <td>{fornecedor.endereco}</td>
                  <td>{fornecedor.telefone}</td>
                  <td>{fornecedor.email}</td>
                  <td>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(index)}>
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(index)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default CadastroFornecedor;
