import React from "react";
import { useForm } from "react-hook-form";
import { Container } from "react-bootstrap";
import "../styles/FormStyle.css";

const CadastroVeiculo = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Dados do veículo:", data);
    alert("Veículo cadastrado com sucesso!");
    reset();
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

          <button type="submit" className="btn btn-primary w-100">Cadastrar</button>
        </form>
      </div>
    </Container>
  );
};

export default CadastroVeiculo;
