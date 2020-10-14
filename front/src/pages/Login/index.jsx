import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../logo.svg";

import { Form, Container } from "./styles";
import { API_URL, ROUTE_CLIENTE } from "../../configs/api";
import { login } from "../../services/auth";

class Login extends Component {
  state = {
    username: "",
    password: "",
    error: ""
  };

  handleLogin = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Preencha todos os campos para realizar o login!" });
    } else {
      try {
        await api.post(ROUTE_CLIENTE.login, { username, password }).then((response)=>{
          if(response.status === 201){
            console.log(response.data)
            console.log(response.token)            
            console.log(response.body)
            
            login(response.data.token);
            this.props.history.push("/home");
          
          }
        });
  
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao realizar o login." });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleLogin}>
          <img src={Logo} alt="caronapp logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Login</button>
          <hr />
          <Link to="/cadastro">Novo aqui? Cadastrar-se.</Link>
        </Form>
      </Container>
    );
  }
}

export default Login;