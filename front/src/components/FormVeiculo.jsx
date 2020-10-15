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
import {NumberType, StringType} from "schema-typed";

const model = Schema.Model({
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
export class FormVeiculo extends Component {

    constructor(props) {
        super(props);
        const veiculo = props['veiculo'];
        this.state = {
            formValues :{
                fabricante: veiculo != null ? veiculo.fabricante : veiculo,
                modelo: veiculo != null ? veiculo.modelo : veiculo,
                ano: veiculo != null ? veiculo.ano : veiculo,
                placa: veiculo != null ? veiculo.placa : veiculo,
                lugares: veiculo != null ? veiculo.lugares : veiculo
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
export default FormVeiculo