import React, { Component } from "react";
import {
    Button,
    ButtonGroup, ButtonToolbar,
    Container,
    Content,
    Header

} from 'rsuite';
import FormUsuario from "../../components/FormUsuario";
import api from "../../services/api";
import {ROUTE_MOTORISTA,ROUTE_CLIENTE} from "../../configs/api";
import {getRole} from "../../services/auth";

class Perfil extends Component {
    async _fetchUser(){
        const url = getRole() == 1 ? ROUTE_MOTORISTA.base : ROUTE_CLIENTE.base;
        await api.get(url).then((response) =>{
            const data = response.data;
            const user ={
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                username: data.username,
                password: data.password,
                password_confirm: data.password_confirm,
            }
            this.setState({user : user,loading : false})
        })

    }
    constructor(props) {
        super(props);
        this.state = {
            user : null,
            loading : true
        };
        this._fetchUser();
    };

    onChange(values){
        this.setState({user : values});
    }

    render() {
        const user = this.state.user;
        const loading = this.state.loading;
        return (
            <Container>
                <Header>
                    <h2>Perfil</h2>
                </Header>
                <Content>
                    { !loading
                        ? <FormUsuario user={user} onChange={this.onChange}></FormUsuario>
                        : <h1>...</h1>
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


export default Perfil;