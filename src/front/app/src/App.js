import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import "./App.css";
import Ripples from "react-ripples";
import { FaList } from "react-icons/fa";

function App() {
  const { register, setValue } = useForm();

  // função para auxiliar a função onSubmit
  const state = {
    button: 1,
  };


  // valores que serão enviados ao banco de dados
  var [id, setId] = useState("");
  var [nome, setNome] = useState("");
  var [idade, setIdade] = useState("");
  var [cpf, setCPF] = useState("");

  const [listaPessoas, verListaPessoas] = useState([]);

  // função Read do CRUD
  const verPessoas = () => {
    Axios.get("http://192.168.15.19:3001/pessoas").then((response) => {
      verListaPessoas(response.data);
    }).catch((erro) => {
      window.alert(erro);
      console.log(erro);
    });
  };

  // função para setar os campos do formulário para o Edit do CRUD
  const setarCampos = (
    id,
    nome,
    idade,
    cpf
  ) => {
    document.querySelector(".button-add").disabled = true;
    document.querySelector(".button-edit").disabled = false;

    document.querySelector(".separator-title").innerHTML = "Editar pessoa";
    window.scrollTo(0, 0);

    setValue("nome", nome);
    setValue("idade", idade);
    setValue("cpf", cpf);


    setId(id);
    setNome(nome);
    setIdade(idade);
    setCPF(cpf);
  };

  // função que reseta os campos do formulário

  const limparCampos = () => {
    setValue("nome", "");
    setValue("idade", "");
    setValue("cpf", "");

    document.querySelector(".button-add").disabled = false;
    document.querySelector(".button-edit").disabled = true;
    document.querySelector(".button-cancel").disabled = true;

    document.querySelector(".separator-title").innerHTML = "Adicionar pessoa";
  };

  // função Delete do CRUD
  const deletarPessoa = (id) => {
    if (window.confirm("Deseja deletar essa pessoa?") === true) {
      Axios.delete(`http://localhost:3001/pessoa/${id}`);
      verPessoas();
    }
  };

  // funções Update e Create do CRUD
  const onSubmit = (e) => {
    // função Update do CRUD
    e.preventDefault();
    if (state.button === 1) {
      Axios.put("http://localhost:3001/pessoa", {
        nome: nome,
        idade: idade,
        cpf: cpf,
        id: id,
      })
        .then(() => {
          limparCampos();
          verPessoas();
          window.alert("Editado com sucesso!");
        })
        .catch(() => {
          window.alert("Ocorreu um erro!");
        });
    } else if (state.button === 2) {
      // função Create do CRUD
      Axios.post("http://localhost:3001/pessoa", {
        nome: nome,
        idade: idade,
        cpf: cpf,
      })
        .then(() => {
          limparCampos();
          verPessoas();
          window.alert("Adicionado com sucesso!");
        })
        .catch(() => {
          window.alert("Ocorreu um erro!");
        });
    }
  };

  return (
    <div className="App">
      {/* -----corpo do CRUD Create----- */}
      <form action="" onSubmit={onSubmit} className="form" id="form">
        {/* título do CRUD Create */}
        <div className="center-separator-crud">
          <div className="separator">
            <span className="separator-title" id="separator-title">
              Adicionar pessoa
            </span>
          </div>
        </div>

        {/* corpo do campo de nome */}
        <div className="nome-div">
          <label htmlFor="nome-input" className="label">
            Nome
          </label>
          <input
            type="text"
            {...register("nome")}
            className="input"
            id="nome-input"
            placeholder="Ex.: Marcos"
            onChange={(event) => {
              setNome(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo de sobrenome */}
        <div className="idade-div">
          <label htmlFor="idade-input" className="label">
            Idade
          </label>
          <input
            type="text"
            {...register("idade")}
            className="input"
            id="idade-input"
            placeholder="Ex.: 30"
            onChange={(event) => {
              setIdade(event.target.value);
            }}
            required
          />
        </div>

        {/* corpo do campo do cep */}
        <div className="cpf-div">
          <label htmlFor="cpf-input" className="label">
            CPF
          </label>
          <input
            type="text"
            {...register("cpf")}
            className="input"
            id="cpf-input"
            placeholder="Ex.: 054.658.598-50"
            onChange={(event) => {
              setCPF(event.target.value);
            }}
            maxLength="14"
            required
          />
        </div>

        {/* corpo dos botões do formulário */}
        <div className="buttons-div">
          {/* corpo do botão do CRUD Create */}
          <div className="button-add-div" id="button-add-div">
            <button
              type="submit"
              onClick={() => (state.button = 2)}
              className="button-add btn"
            >
              <p>ADICIONAR</p>
            </button>
          </div>

          {/* corpo do botão do CRUD Update */}
          <div className="button-edit-div" id="button-edit-div">
            <button
              type="submit"
              onClick={() => (state.button = 1)}
              className="button-edit btn"
              disabled
            >
              <p>CONFIRMAR</p>
            </button>
          </div>

          {/* corpo do botão de limpar os campos */}
          <div className="button-cancel-div">
            <button
              onClick={limparCampos}
              type="button"
              className="button-cancel btn"
            >
              <p>CANCELAR</p>
            </button>
          </div>
        </div>
      </form>
      {/* ------------------------------ */}

      {/* ------corpo do CRUD Read------ */}
      <div className="lista-cadastro">
        {/* corpo do título do CRUD Read*/}
        <div className="center-separator">
          <div className="separator">
            <span>Lista de pessoas</span>
          </div>
        </div>

        {/* corpo do botão para listar as pessoas */}
        <div className="crud-read-div">
          <Ripples className="crud-read-button-div">
            <button
              type="button"
              onClick={verPessoas}
              className="crud-read-button"
            >
              <FaList className="icon" />
            </button>
          </Ripples>
        </div>

        {/* corpo da área em que as pessoas são listadas */}
        <div className="lista-pessoas">
          {/* corpo da função para listar todas as pessoas registradas no banco de dados */}
          {listaPessoas.map((val, key) => {
            return (
              <div className="pessoa">
                <div className="center-separator-crud">
                  <div className="separator">
                    <span className="separator-title" id="separator-title">
                      #{val.id}
                    </span>
                  </div>
                </div>
                <h3 className="info-header">
                  <span className="info">NOME:</span>
                  <span className="info-valor">{val.nome}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">IDADE:</span>
                  <span className="info-valor">{val.idade}</span>
                </h3>
                <h3 className="info-header">
                  <span className="info">CPF:</span>
                  <span className="info-valor">{val.cpf}</span>
                </h3>
                <div className="read-buttons">
                  <button
                    type="button"
                    className="button-read-edit btn"
                    onClick={() => {
                      setarCampos(
                        val.id,
                        val.nome,
                        val.idade,
                        val.cpf
                      );
                    }}
                  >
                    <p>EDITAR</p>
                  </button>
                  <button
                    type="button"
                    className="button-delete btn"
                    onClick={() => {
                      deletarPessoa(val.id);
                      verPessoas();
                    }}
                  >
                    <p>DELETAR</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ------------------------------ */}
    </div>
  );
}

export default App;