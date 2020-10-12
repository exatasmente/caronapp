import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../logo.svg";

import { Form, Container, CheckBox, CheckBoxWrapper ,CheckBoxLabel,Label } from "./styles";
import { ROUTE_CLIENTE,ROUTE_MOTORISTA } from "../../configs/api";
import  ToggleSwitch  from "../../components/ToggleSwitch";
class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    driver : false,
    error: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha todos os dados para se cadastrar!" });
    } else {
      try {
        let url = ROUTE_CLIENTE.cadastro;
        if(!this.state.driver){
          url = ROUTE_MOTORISTA.cadastro
        }
        await api.post(url, { username, email, password }).then((response)=>{
          if(response.status === 201){
            this.props.history.push("/");
          }
        });
  
      } catch (err) {
        console.log(err);
        this.setState({ error: "Ocorreu um erro ao registrar sua conta. :(" });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          <img src={Logo} alt="caronapp logo" />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="text"
            placeholder="Nome de usuário"
            onChange={e => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <ToggleSwitch
              onToggle={e => this.setState({ driver: !this.state.driver })}
              bgToggled='green'
              bgClear='gray'
              outerLabel='Motorista'
          />
          
          <button type="submit">Cadastrar grátis</button>
          <hr />
          <Link to="/">Fazer login</Link>
        </Form>
      </Container>
    );
  }
}

export default SignUp;