import React, { Component } from "react";
import {
    Container,
    Content,
    Header

} from 'rsuite';

class Veiculo extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Container>
                <Header>
                    <h2>Veiculo</h2>
                </Header>
                <Content>Content</Content>
            </Container>
        );
    }

}


export default Veiculo;