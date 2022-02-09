import './App.css';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Logo from "./assets/logo.png";

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório!"),
    email: yup.string().email("Digite um email válido").required("O email é obrigatório!"),
    password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos!").required("A senha é obrigatório!"),
    confirmPassword: yup
      .string()
      .required("Confirmar a senha é obrigatório!")
      .oneOf([yup.ref("password")], "As senhas devem ser iguais!"),
  })
  .required();

function App() {

  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  //console.log(watch("name"))

  function onSubmit(userData) {
    console.log(userData.name);
    console.log(userData.email);
    console.log(userData.password);
    console.log(userData.confirmPassword);
    userData.innerHTML = "";
  }

  //console.log(errors)
  const [inputValue, setInputValue] = useState();

  function clearInputs() {
    setInputValue("");
    alert("Cadastrado com Sucesso!");
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <img src={Logo} alt="Logo" />
        <label>
          Nome
          <input
            {...register("name", { required: true })}
            type="text"
            autocomplete="off"
            value={inputValue}
          />
          <span>{errors.name?.message}</span>
        </label>

        <label>
          Email
          <input
            {...register("email")}
            type="text"
            autocomplete="off"
            value={inputValue}
          />
          <span>{errors.email?.message}</span>
        </label>

        <label>
          Senha
          <input {...register("password")} type="password" value={inputValue} />
          <span>{errors.password?.message}</span>
        </label>

        <label>
          Confirmar Senha
          <input
            {...register("confirmPassword")}
            type="password"
            value={inputValue}
          />
          <span>{errors.confirmPassword?.message}</span>
        </label>

        <button type="submit" onClick={(e) => clearInputs()}>
          Cadastrar-se
        </button>
      </form>
    </div>
  );
}

export default App;
