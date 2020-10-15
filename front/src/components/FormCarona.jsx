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
import {DateType, NumberType, StringType} from "schema-typed";
import InputDate from "./InputDate";

const modelDate =  Schema.Model({
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
const modelDestino = Schema.Model({
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


export class FormDestino extends Component {

    constructor(props) {
        super(props);
        const data = props.data
        this.state = {
            formValues :{
                line_1:  data ? data.line_1 : '',
                line_2:  data ? data.line_2 : '',
                city:  data ? data.line_city: '',
                state:  data ? data.state : '',
                zipcode:  data ? data.zipcode: '',
            },
            formError: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }
    handleChange(values) {
        this.setState({formValues: values})
    }
    clearFormErrors(){
        const formError = {};
        this.setState({formError : formError})
    }
    validate() {
        this.form.check()
        this.props.onChange(this.state.formValues);
        // return this.form.valid
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
                                onChange={this.handleChange}
                                onCheck={formError => {
                                    this.setState({ formError });
                                }}
                                formValue={formValue}
                                model={modelDestino}
                                fluid>
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
export class FormDate extends Component {

    constructor(props) {
        super(props);
        this.onChange = props.onChange;
        const data  = props.data
        this.state = {
            formValues :{
               date: data ? data.date : '',
               time: data ? data.time : '',
               pessoas : data ? data.pessoas : 0,
            },
            formError: {}
        };

        this.updateDate = this.updateDate.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.validate = this.validate.bind(this);
    }
    handleChange(values) {
        this.setState({formValues: values})
    }
    clearFormErrors(){
        const formError = {};
        this.setState({formError : formError})
    }
    validate() {
        this.form.check()
        this.props.onChange(this.state.formValues);
        // return this.form.valid
    }

    updateDate(date) {
        let formValues = this.state.formValues
        formValues.date = date
        this.setState({ formValues: formValues })

    }
    updateTime(date){
        let formValues = this.state.formValues
        if (formValues.date != null) {
            formValues.date.setHours(date.getHours())
            formValues.date.setMinutes(date.getMinutes())
            formValues.time = date
            this.setState({ formValues: formValues })
        } else {
            let formError = this.state.formError
            formError.time = "Horário Inválido"
            this.setState({ formError: formError })

        }

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
                                onChange={this.handleChange}
                                onCheck={formError => {
                                    this.setState({ formError });
                                }}
                                formValue={formValue}
                                model={modelDate}
                                fluid>
                                <InputDate name="Data da Viagem" appearance="default" placeholder="Selecione a data da viagem"
                                           onSelect={this.updateDate}
                                           format="DD-MM-YYYY"
                                           defaultValue={this.state.formValues.date || null }
                                           errorMessage={this.state.formError.date || null}
                                           block
                                />
                                {formValue.date != null ?
                                    <InputDate name="Data da Viagem" appearance="default" placeholder="Selecione a data da viagem"
                                               onSelect={this.updateTime}
                                               format="HH:mm"
                                               defaultValue={this.state.formValues.date || null }
                                               errorMessage={this.state.formError.time || null}
                                               block
                                    />
                                    : null}

                                <FormGroup>

                                    <ControlLabel>Quantidade de passageiros (não incluir você)</ControlLabel>
                                    <FormControl name="pessoas" type="number" min="0" step="1" />
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