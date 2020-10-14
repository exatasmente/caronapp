import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Panel,
  PanelGroup,



} from 'rsuite';

class Home extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
        <Container>
          <Header>
            <h2>Caronas</h2>
          </Header>

          <Content>
            <PanelGroup accordion bordered>
              <Header style={{padding:'2rem'}}>
                <h5>Nova Viagem</h5>
              </Header>
              <Panel header="Data da Viagem" defaultExpanded>

              </Panel>
              <Panel header="Destino da Viagem">

              </Panel>
              <Panel header="Detalhes da Viagem" >

              </Panel>
            </PanelGroup>
          </Content>
        </Container>
    );
  }

}


export default Home;