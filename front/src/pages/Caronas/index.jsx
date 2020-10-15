import React, { Component } from "react";
import {
  Container,
  Content,
  Header,
  Panel,
  PanelGroup,
  ButtonGroup,
  Button,
  ButtonToolbar,
  List,
  FlexboxGrid,
  Icon,
  Whisper,
  Tooltip

} from 'rsuite';
import {FormDate, FormDestino} from "../../components/FormCarona";
import api from "../../services/api";
import {getRole} from "../../services/auth";
import {ROUTE_CLIENTE, ROUTE_MOTORISTA} from "../../configs/api";
import {showNotification} from "../../routes";


const styleCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px'
};

const slimText = {
  fontSize: '0.666em',
  color: '#97969B',
  fontWeight: 'lighter',
  paddingBottom: 5
};

const titleStyle = {
  paddingBottom: 5,
  whiteSpace: 'nowrap',
  fontWeight: 500
};

const dataStyle = {
  fontSize: '1.2em',
  fontWeight: 500
};

class Home extends Component {
  _getViagens(){
    const url = getRole() == 1 ? ROUTE_CLIENTE.viagem : ROUTE_MOTORISTA.viagem;
      api.get(url).then((response) =>{
        if(response.status === 200) {
          console.log(data);
          const data = response.data;
          this.setState({data : data,loading : false});

        }
      });
  }
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      data : [],
      formValues : {
        date : '',
        pessoas : '',
        line_1 : '',
        line_2 : '',
        city : '',
        state : '',
        zipcode : ''
      }
    }
    this.formDate = React.createRef()
    this.formDestino = React.createRef()

    this._getViagens()
    this.handleNewViagem = this.handleNewViagem.bind(this);
  }

  getColorStatus(status) {
    switch (status) {
      case 1 :
        return 'yellow'
      case 2 :
        return 'green'
      case 3 :
        return 'red'
      case 4 :
        return 'orange'
      case 5 :
        return 'green'
    }
  }
    getStatusText(status){
      switch (status) {
        case 1 :
          return 'Pendente'
        case 2 :
          return 'Aceito'
        case 3 :
          return 'Recusado'
        case 4 :
          return 'Expiado'
        case 5 :
          return null
      }
  }
  handleNewViagem(){
    if(this.formDate.form.check() && this.formDestino.form.check()) {
      const formDate = this.formDate.state.formValues;
      const formDestino = this.formDestino.state.formValues;
      const viagem = {
        date : formDate.date,
        pessoas : formDate.pessoas,
        line_1: formDestino.line_1,
        line_2: formDestino.line_2,
        city  : formDestino.city,
        state : formDestino.state,
        zipcode  : formDestino.zipcode,
      }
      const url = getRole() == 1 ? ROUTE_CLIENTE.viagem : ROUTE_MOTORISTA.viagem;
      api.post(url,viagem).then((response) =>{
        if(response.status === 200){
            showNotification('success','Viagem cadastrada com sucesso!');
            this._getViagens()
        }
      })
    }
  }
  render() {
    const data = this.state.data;
    const loading = this.state.loading;
    return (
        <Container>
          <Header>
            <h2>Caronas</h2>
          </Header>
          <Content>
            <PanelGroup accordion bordered>
              <Panel header="Nova Viagem">
                <Header>
                  <h5>Data da Viagem</h5>
                </Header>
                  <FormDate ref={instance => { this.formDate = instance; }}/>
                  <Header>
                    <h5>Destino da Viagem</h5>
                  </Header>
                  <FormDestino  ref={instance => { this.formDestino = instance; }}/>
                <ButtonToolbar style={{padding: '2rem'}} >
                  <ButtonGroup>
                    <Button appearance="primary" onClick={this.handleNewViagem} >Salvar</Button>
                  </ButtonGroup>
                </ButtonToolbar>
              </Panel>
            </PanelGroup>
            {getRole() == 1
                ? <List hover>
                  {!loading && data.map((item, index) => (
                      <List.Item key={index} index={index}>
                        <FlexboxGrid>
                          {/*base info*/}
                          <FlexboxGrid.Item
                              colspan={6}
                              style={{
                                ...styleCenter,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                overflow: 'hidden'
                              }}
                          >
                            <div style={titleStyle}>{item['destino']['city'] + ' - ' + item['destino']['state']}</div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={2} style={styleCenter}>
                            <div style={{textAlign: 'right'}}>
                              <div style={slimText}>Solicitacoes</div>
                              <div style={dataStyle}>
                              <Whisper
                                  trigger="click"
                                  placement="auto"
                                  speaker={
                                    <Tooltip>
                                      {item['carona']['solicitacoes'].map((solicitacao,index) =>{
                                        return (<div>{"#"+(index+1) + '-' + this.getStatusText(solicitacao.status) + ' | Pessoas : ' + (solicitacao.viagem.pessoas+1) }</div>)
                                      })}
                                    </Tooltip>
                                  }
                              >
                                <div style={dataStyle}>
                                  {' ' + item['carona']['solicitacoes'].length}
                                </div>

                              </Whisper>
                              </div>

                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={2} style={styleCenter}>
                            <div style={{textAlign: 'right'}}>
                              <div style={slimText}>Vagas</div>
                              <div style={dataStyle}>
                                <div>
                                  <Icon icon="circle" style={{color: item['carona']['vagas'] > 0 ? 'green' : 'red'}}/>
                                  {' ' + item['carona']['vagas']}
                                </div>
                              </div>
                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={6} style={styleCenter}>
                            <div style={{textAlign: 'right'}}>
                              <div style={slimText}>Data</div>
                              <div style={dataStyle}>
                                {item['date']}
                              </div>
                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                              colspan={4}
                              style={{
                                ...styleCenter
                              }}
                          >
                            <a href="#">Detalhes</a>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </List.Item>
                  ))}
                </List>
                : <List hover>
                  {!loading && data.map((item, index) => (
                      <List.Item key={index} index={index}>
                        <FlexboxGrid>
                          {/*base info*/}
                          <FlexboxGrid.Item
                              colspan={6}
                              style={{
                                ...styleCenter,
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                overflow: 'hidden'
                              }}
                          >
                            <div style={titleStyle}>{item['destino']['city'] + ' - ' + item['destino']['state']}</div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={2} style={styleCenter}>
                            <div style={{textAlign: 'right'}}>
                              <div style={slimText}>Solicitacoes</div>
                              <div style={dataStyle}>
                                <Whisper
                                    trigger="click"
                                    placement="auto"
                                    speaker={
                                      <Tooltip>
                                        {item['solicitacoes'].map((solicitacao,index) =>{
                                          return (<div>{"#"+(index+1) + '-' + this.getStatusText(solicitacao.status)}</div>)
                                        })}
                                      </Tooltip>
                                    }
                                >
                                  <div style={dataStyle}>
                                    {' ' + item ['solicitacoes'].length}
                                  </div>

                                </Whisper>
                              </div>
                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item colspan={6} style={styleCenter}>
                            <div style={{textAlign: 'right'}}>
                              <div style={slimText}>Data</div>
                              <div style={dataStyle}>
                                {item['date']}
                              </div>
                            </div>
                          </FlexboxGrid.Item>
                          <FlexboxGrid.Item
                              colspan={4}
                              style={{
                                ...styleCenter
                              }}
                          >
                            <a href="#">Detalhes</a>
                          </FlexboxGrid.Item>
                        </FlexboxGrid>
                      </List.Item>
                  ))}
                </List>
            }
          </Content>
        </Container>
    );
  }

}


export default Home;