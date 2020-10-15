import React, {Component} from "react";

import {
    Container,
    Content,
    ControlLabel,
    FlexboxGrid,
    Form,
    FormControl,
    FormGroup,
    Schema,
} from "rsuite";
import {StringType} from "schema-typed";

const model = Schema.Model({
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
});
export class FormUsuario extends Component {

    constructor(props) {
        super(props);
        const user = props['user']
        console.log(props)
        this.state = {
            formValues :{
                first_name: user != null ?  user.first_name : '',
                last_name: user  != null ?  user.last_name : '',
                email: user  != null ?  user.email : '',
                username:  user  != null ?  user.username : '',
                password: '',
                password_confirm: '',
            },
            formError: {}
        };

    }
    clearFormErrors(){
        const formError = {};
        this.setState({formError : formError})
    }
    validate() {
        return this.form.check()
    }
    render() {
        const formValue = this.state.formValues;
        return (
            <Container>
                <Content>
                    <FlexboxGrid justify="center" style={{ 'paddingTop': '2rem', 'paddingBottom': '2rem' }}>
                        <FlexboxGrid.Item colspan={12}>
                                <Form
                                    ref={ref => (this.form = ref)}
                                    onChange={(formValue) => {
                                        this.setState({formValues : formValue })
                                    }}
                                    onCheck={formError => {
                                        this.setState({ formError });
                                    }}
                                    formValue={formValue}
                                    model={model}
                                    fluid>
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

                                    </FormGroup>
                                </Form>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </Container>
        );
    }
}
export default FormUsuario