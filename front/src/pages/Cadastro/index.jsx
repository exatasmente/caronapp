import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import api from "../../services/api";
import InputDate from "../../components/InputDate"
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
import { ROUTE_SINGUP } from "../../configs/api";

const { StringType, DateType, NumberType } = Schema.Types;




const modelStep1 = Schema.Model({
  date: DateType()
    .isRequired('Informe a data da Viagem')
    .addRule( (value,data) => {
      return value > (new Date())
    },'A Data tem que ser maior que a data de hoje'),

  time : DateType()
  .isRequired('Informe o horário da Viagem'),
  pessoas: NumberType()
    .isInteger('A quantidade de pessoas tem que ser um numero')
    .min(0, 'Informe um valor positivo ou Zero')
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



const modelStep4 = Schema.Model({
  fabricante: StringType()
    .isRequired('Informe o fabricante do veículo'),
  modelo: StringType()
    .isRequired('O modelo também é necessário'),
  placa: StringType()
    .isRequired('A placa do veículo é obrigatória'),

  ano: NumberType()
    .isRequired('Digite o ano do seu veículo'),
  lugares: NumberType()
    .isRequired('Informar a quantidade de lugares do veículo é obrigatória.')
    .min(5, 'A quantidade mínima de lugares aceita é 5.')
})


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 3,
      formStep3: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        password_confirm: '',
      },
      formStep2: {
        line_1: '',
        line_2: '',
        city: '',
        state: '',
        zipcode: '',
        latitude: '',
        longitude: '',
      },
      formStep1: {
        date: null,
        time: null,
        pessoas: 0,
      },
      formStep4: {
        fabricante: '',
        modelo: '',
        ano: '',
        placa: '',
        lugares: ''
      },
      driver: false,
      formError: {}
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.updateDate = this.updateDate.bind(this);
    this.updateTime = this.updateTime.bind(this);

  }
  clearFormErrors(){
    const formError = {};
    this.setState({formError : formError})
  }
  _next = () => {
    let lastStep = this.state.driver ? 4 : 3;
    let currentStep = this.state.currentStep
    if (this.validateStep()) {
      currentStep = currentStep >= lastStep ? lastStep : currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }else{
      this.clearFormErrors()
    }
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }
  validateStep() {
    return this.form.check()
  }
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep > 1) {
      return (
        <Link to={"#"} onClick={e =>{ e.preventDefault(); this._prev() }} >Voltar</Link>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    
    if (currentStep < 3) {
      return (
        <Button onClick={this._next} appearance="primary">Avançar</Button>
      )
    }else if (currentStep == 3 || currentStep == 4 ){
      return <Button onClick={this.state.driver && currentStep == 3 ? this._next : this.handleSignUp} type={this.state.driver ? 'buttom' : 'submit'} appearance="primary">{this.state.driver ? "Cadastrar como Motorista" : "Cadastrar como Passageiro"}</Button>
    }
    return null;
  }

  handleSignUp = async (e) => {
    e.preventDefault();
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    const { formStep1, formStep2, formStep3, formStep4, driver} = this.state;
    try {
      
      let role = driver ? 1 : 2
      let data = {
        usuario : formStep3,
        destino : formStep1,
        viagem : formStep2,
        veiculo : formStep4,
        role : role,


      }
      await api.post(ROUTE_SINGUP, data).then((response) => {
        if (response.status === 201) {
          this.props.history.push("/");
        }
      });

    } catch (err) {
      console.log(err);
      this.setState({ error: "Ocorreu um erro ao registrar sua conta. :(" });
    }

  };
  setFormState(formValues) {
    if (this.state.currentStep === 1) {
      this.setState({ formStep1: formValues });
    } else if (this.state.currentStep === 2) {
      this.setState({ formStep2: formValues });
    } else if (this.state.currentStep === 3) {
      this.setState({ formStep3: formValues });
    } else if (this.state.currentStep === 4) {
      this.setState({ formStep4: formValues });
    }

  }
  getCurrentStep() {
    if (this.state.currentStep === 1) {
      return this.step1();
    } else if (this.state.currentStep === 2) {
      return this.step2();
    } else if (this.state.currentStep === 3) {
      return this.step3();
    }else if (this.state.currentStep === 4) {
      return this.step4();
    }

  }
  updateDate(date) {
    let formStep1 = this.state.formStep1
    formStep1.date = date
    this.setState({ formStep1: formStep1 })

  }
  updateTime(date){
    let formStep1 = this.state.formStep1
    if (formStep1.date != null) {
      formStep1.date.setHours(date.getHours())
      formStep1.date.setMinutes(date.getMinutes())
      formStep1.time = date
      this.setState({ formStep1: formStep1 })
    } else {
      let formError = this.state.formError
      formError.time = "Horário Inválido"
      this.setState({ formError: formError })
      
    }
    
  }
  _getCurrentFormState(){

    if (this.state.currentStep === 1) {
      return this.state.formStep1
    } else if (this.state.currentStep === 2) {
      return this.state.formStep2
    } else if (this.state.currentStep === 3) {
      return this.state.formStep3
    }else if (this.state.currentStep === 4) {
      return this.state.formStep4
    }
  }
  _getCurrentFormModel(){
    if (this.state.currentStep === 1) {
      return modelStep1
    } else if (this.state.currentStep === 2) {
      return modelStep2
    } else if (this.state.currentStep === 3) {
      return modelStep3
    }else if (this.state.currentStep === 4) {
      return modelStep4
    }
  }
  render() {
    const formValue = this._getCurrentFormState()
    const model = this._getCurrentFormModel()

    return (
      <Container>
        <Content>
          <FlexboxGrid justify="center" style={{ 'paddingTop': '2rem', 'paddingBottom': '2rem' }}>
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Cadastro</h3>} bordered>
                <img src={Logo} alt="CaronAPP logo" style={{ 'height': '200px', 'margin': 'auto', 'display': 'flex' }} />
                <Form
                  ref={ref => (this.form = ref)}
                  onChange={(formValue) => {
                    this.setFormState(formValue)
                  }}
                  onCheck={formError => {
                    this.setState({ formError });
                  }}
                  formValue={formValue}
                  model={model}
                  fluid>
                  {this.getCurrentStep()}
                  <FormGroup>
                    <ButtonToolbar style={{padding: '1rem', marginTop : '2rem' }}>
                      {this.previousButton()}
                      {this.nextButton()}
                    </ButtonToolbar>
                  </FormGroup>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    );
  }
  step3() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Nome</ControlLabel>
          <FormControl name="first_name" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Sobrenome</ControlLabel>
          <FormControl name="last_name" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" type="email" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Nome de Usuário</ControlLabel>
          <FormControl name="username" type="text" />
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
          <Toggle checked={this.state.driver} name="driver" onChange={(e) => this.setState({ driver: !this.state.driver })} />
        </FormGroup>
      </div>
      );
  }

  step2() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Endereço</ControlLabel>
          <FormControl name="line_1" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Complemento</ControlLabel>
          <FormControl name="line_2" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Cidade</ControlLabel>
          <FormControl name="city" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Estado</ControlLabel>
          <FormControl name="state" type="email" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>CEP</ControlLabel>
          <FormControl name="zipcode" type="text" />
        </FormGroup>
      </div>
        );
    
  }



  step1() {
    const formValue = this._getCurrentFormState()
    return (
      <div>
        <InputDate name="Data da Viagem" appearance="default" placeholder="Selecione a data da viagem"
          onSelect={this.updateDate}
          format="DD-MM-YYYY"
          defaultValue={this.state.formStep1.date || null }
          errorMessage={this.state.formError.date || null}
          block
        />
        {formValue.date != null ? 
          <InputDate name="Data da Viagem" appearance="default" placeholder="Selecione a data da viagem"
          onSelect={this.updateTime}
          format="HH:mm"
          defaultValue={this.state.formStep1.date || null }
          errorMessage={this.state.formError.time || null}
          block
        />  
        : null}
        
        <FormGroup>

          <ControlLabel>Quantidade de passageiros (não incluir você)</ControlLabel>
          <FormControl name="pessoas" type="number" min="0" step="1" />
        </FormGroup>
      </div>);
  }

  step4() {
    return (
      <div style={{paddingBottom:' 10px'}}>
        <FormGroup>
          <ControlLabel>Fabricante</ControlLabel>
          <FormControl name="fabricante" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Modelo</ControlLabel>
          <FormControl name="modelo" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Ano</ControlLabel>
          <FormControl name="ano" type="number" min="1990" step="1" max={(new Date()).getFullYear()} />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Placa</ControlLabel>
          <FormControl name="placa" type="text" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Quantidade de Lugares do veículo.</ControlLabel>
          <FormControl name="lugares" type="number" min="5" step="1" />
        </FormGroup>
      </div>);
  }

}


export default SignUp;