import React, { Component } from "react";
import {
    Container,
    Content,
    Header

} from 'rsuite';

class Home extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <Container>
                <Header>
                    <h2>Home</h2>
                </Header>
                <Content>Content</Content>
            </Container>
        );
    }

}


export default Home;