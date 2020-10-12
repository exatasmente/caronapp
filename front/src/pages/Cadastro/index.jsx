import React, {Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";

import Logo from "../../logo.svg";
import {
  Container,
  Content,
  Button,
  FlexboxGrid,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Toggle,
  Schema,
  DatePicker

} from 'rsuite';
import { ROUTE_CLIENTE,ROUTE_MOTORISTA } from "../../configs/api";

const { StringType,DateType, NumberType } = Schema.Types;
const modelStep1 = Schema.Model({
    first_name: StringType()
        .isRequired('Precisamos do seu primeiro nome'),
    last_name: StringType()
          .isRequired('O Sobrenome também é necessário'),
    email: StringType()
          .isRequired('O email é obrigatório')
          .isEmail('O Campo precisa ser um email válido'),
    username: StringType()
          .isRequired('Digite um nome de usuário, ele será usado no seu login'),
    password: StringType()
        .isRequired('A Senha é obrigatória'),
    password_confirm: StringType()
        .addRule((value, data) => {
              if (value !== data.password) {
                return false;
              }
              return true;
          }, 'As senhas não são iguais')
        .isRequired('A Confirmação de Senha é obrigatória'),
})
const modelStep2 = Schema.Model({
    line_1: StringType()
        .isRequired('Precisamos do seu endereço'),
    line_2: StringType()
          .isRequired('Informe um complemento para o seu endereço'),
    city: StringType()
          .isRequired('Informe uma cidade'),
    state: StringType()
          .isRequired('Informe um Estado'),
    zipcode: StringType()
        .isRequired('Informe o Seu CEP'),
})
const modelStep3 = Schema.Model({
    date: DateType()
        .isRequired('Informe a data da Viagem'),
    pessoas: NumberType()
          .isInteger('A quantidade de pessoas tem que ser um numero')
          .min(0,'Informe um valor positivo ou Zero')
})

const modelStep4 = Schema.Model({
    first_name: StringType()
        .isRequired('Precisamos do seu primeiro nome'),
    last_name: StringType()
          .isRequired('O Sobrenome também é necessário'),
    email: StringType()
          .isRequired('O email é obrigatório')
          .isEmail('O Campo precisa ser um email válido'),
    username: StringType()
          .isRequired('Digite um nome de usuário, ele será usado no seu login'),
    password: StringType()
        .isRequired('A Senha é obrigatória'),
    password_confirm: StringType()
        .addRule((value, data) => {
              if (value !== data.password) {
                return false;
              }
              return true;
          }, 'As senhas não são iguais')
        .isRequired('A Confirmação de Senha é obrigatória'),
})


class SignUp extends Component {
   constructor(props) {
    super(props);
    this.state = {
      currentStep : 1,
      formStep1: {
        first_name: '',
        last_name : '',
        email: '',
        username: '',
        password: '',
        password_confirm: '',
      },
      formStep2: {
        line_1: '',
        line_2 : '',
        city: '',
        state: '',
        zipcode: '',
        latitude: '',
        longitude: '',
      },
      formStep3: {
        date : '',
        time : '',
        pessoas : '',
      },
      formStep4 : {
        fabricante : '',
        modelo : '',
        ano  : '',
        placa  : '',
        lugares : ''
      },
      driver : false,
      formError: {}
    };
    this.handleSignUp = this.handleSignUp.bind(this);

  }
  _next = () => {
    let lastStep = this.state.driver ? 4 : 3;
    let currentStep = this.state.currentStep
    if(this.validateStep()) {
      currentStep = currentStep >= lastStep ? lastStep : currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }
  validateStep(){
     return this.form.check()
  }
  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep > 1){
      return (
          <Link onClick={this._prev} >Voltar</Link>
      )
    }
    return null;
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    let lastStep = this.state.driver ? 4 : 3;
    if(currentStep < lastStep){
      return (
          <Button onClick={this._next} appearance="primary">Avançar</Button>
      )
    }
    return null;
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    const { username, email, password } = this.state;
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

  };
  setFormState(formValue){
    if(this.state.currentStep === 1 ){
      this.setState({   formStep1 : formValue });
    }else if (this.state.currentStep === 2){
      this.setState({   formStep2 : formValue });
    }else if(this.state.currentStep === 3 ){
      this.setState({   formStep3 : formValue });
    }else if(this.state.currentStep === 4){
      this.setState({   formStep4 : formValue });
    }

  }
  getCurrentStep()
  {
      if(this.state.currentStep === 1 ){
        return this.step1(this.state.formStep1,modelStep1);
      }else if(this.state.currentStep === 2){
        return this.step2(this.state.formStep2,modelStep2);
      } else if(this.state.currentStep === 3){
        return this.step3(this.state.formStep3,modelStep2);
      }

  }
  render() {
    return (
        <Container>
          <Content>
            <FlexboxGrid justify="center" style={{'paddingTop' : '2rem', 'paddingBottom' : '2rem'}}>
              <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Cadastro</h3>} bordered>
                  <img src={Logo} alt="CaronAPP logo" style={{'height' : '200px', 'margin' : 'auto' ,'display' : 'flex' }}/>
                  {this.getCurrentStep()}
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
    );
  }
  step1(formValue,model){
    return(
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setFormState(formValue)
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
          fluid>
            <FormGroup>
              <ControlLabel>Nome</ControlLabel>
              <FormControl name="first_name" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Sobrenome</ControlLabel>
              <FormControl name="last_name" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl name="email" type="email"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Nome de Usuário</ControlLabel>
              <FormControl name="username" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Senha</ControlLabel>
              <FormControl name="password" type="password" />
            </FormGroup>
            <FormGroup>
               <ControlLabel>Confirmação da Senha</ControlLabel>
               <FormControl name="password_confirm" type="password" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Motorista</ControlLabel>
                <Toggle checked={this.state.driver}  name="driver" onChange={(e) => this.setState({driver : !this.state.driver})}/>
            </FormGroup>
            <FormGroup>
              {this.nextButton()}
            </FormGroup>
      </Form>);
  }

  step2(formValue,model){
    return(
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setFormState(formValue)
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
          fluid>
            <FormGroup>
              <ControlLabel>Endereço</ControlLabel>
              <FormControl name="line_1" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Complemento</ControlLabel>
              <FormControl name="line_2" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Cidade</ControlLabel>
              <FormControl name="city" type="text"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Estado</ControlLabel>
              <FormControl name="state" type="email"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>CEP</ControlLabel>
              <FormControl name="zipcode" type="text"/>
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
              {this.previousButton()}
              {this.nextButton()}
              </ButtonToolbar>
            </FormGroup>
      </Form>);
  }
  step3(formValue,model){
    return(
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setFormState(formValue)
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
          fluid>
            <FormGroup>
              <ControlLabel>Data da viagem</ControlLabel>
              <DatePicker appearance="default" placeholder="Selecione a data da viagem" style={{ width: 280 }}
               format="DD-MM-YYYY"
               locale={{
                  sunday: 'Dom',
                  monday: 'Seg',
                  tuesday: 'Ter',
                  wednesday: 'Qua',
                  thursday: 'Qui',
                  friday: 'Sex',
                  saturday: 'Sab',
                  ok: 'OK',
                  today: 'Hoje',
                  yesterday: null,
                  hours: 'Horas',
                  minutes: 'Minutos',
                  seconds: 'Segundos'
               }}
              />

            </FormGroup>
            <FormGroup>
              <ControlLabel>Hora da viagem</ControlLabel>
              <DatePicker name="time" format="HH:mm" ranges={[]} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Quantidade de passageiros (não incluir você)</ControlLabel>
              <FormControl name="pessoas" type="number" min="0" step="1"/>
            </FormGroup>
            <FormGroup>
              <ButtonToolbar>
              {this.previousButton()}
              {this.nextButton()}
              </ButtonToolbar>
            </FormGroup>
      </Form>);
  }
}

export default SignUp;