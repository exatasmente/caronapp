import React, { Component } from "react";
import {
    Button,
    ButtonGroup, ButtonToolbar,
    Container,
    Content,
    Header

} from 'rsuite';
import FormVeiculo from "../../components/FormVeiculo";
import {ROUTE_MOTORISTA} from "../../configs/api";
import api from "../../services/api";

class Veiculo extends Component {
     async _fetchVeiculo(){
         await api.get(ROUTE_MOTORISTA.veiculo).then((response) =>{
            const data = response.data;
            const veiculo = {
                fabricante : data.fabricante,
                modelo     : data.modelo,
                ano        : data.ano,
                placa      : data.placa
             }
             this.setState({veiculo: veiculo,loading :false})
        })

    }
    constructor(props) {
        super(props);
        this.state = {
            veiculo : null,
            loading : true,
        }
        this._fetchVeiculo();
    };

    render() {
        const veiculo = this.state.veiculo;
        const loading = this.state.loading;
        return (
            <Container>
                <Header>
                    <h2>Veiculo</h2>
                </Header>
                <Content>
                    {!loading
                        ? <FormVeiculo veiculo={veiculo}></FormVeiculo>
                        : '...'
                    }
                    <ButtonToolbar style={{padding: '2rem'}} >
                        <ButtonGroup>
                            <Button appearance="primary" >Salvar</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Content>
            </Container>
        );
    }

}


export default Veiculo;