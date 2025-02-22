import React from "react";
import { useForm } from "react-hook-form";
import { cnpj } from "cpf-cnpj-validator";
import { Container } from "react-bootstrap";
import "../styles/FormStyle.css";

const CadastroFornecedor = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do fornecedor:", data);
    alert("Fornecedor cadastrado com sucesso!");
    reset();
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
                validate: value => cnpj.isValid(value) || "CNPJ inválido"
              })}
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
              type="tel"
              className={`form-control ${errors.telefone ? "is-invalid" : ""}`}
              placeholder="(11) 98765-4321"
              {...register("telefone", { 
                required: "O telefone é obrigatório",
                pattern: {
                  value: /^\(\d{2}\) \d{5}-\d{4}$/,
                  message: "Telefone inválido. Use o formato (11) 98765-4321"
                }
              })}
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
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "E-mail inválido"
                }
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
    </Container>
  );
};

export default CadastroFornecedor;
