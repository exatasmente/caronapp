import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import SignUp from "./pages/Cadastro";
import Login from "./pages/Login";
import Caronas from "./pages/Caronas";
import Perfil from "./pages/Perfil";
import Veiculo from "./pages/Veiculo";
import Home from "./pages/Home";
import { isAuthenticated } from "./services/auth";
import {
    Nav,
    Icon,
    Container,
    Sidebar,
    Sidenav,
    Content
} from "rsuite";


const headerStyles = {
    padding: 18,
    fontSize: 16,
    height: 56,
    background: '#34c3ff',
    color: ' #fff',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};


const iconStyles = {
    width: 56,
    height: 56,
    lineHeight: '56px',
    textAlign: 'center'
};
const AppLayout = ({children, ...rest}) => {
    return (
        <Container>
            <Sidebar
                style={{ display: 'flex', flexDirection: 'column' }}
                width={260}
                collapsible
            >
                <Sidenav
                    defaultOpenKeys={['4']}
                    appearance="subtle"
                >
                    <Sidenav.Header>
                        <div style={headerStyles}>
                            <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
                            <span style={{ marginLeft: 12 }}> BRAND</span>
                        </div>
                    </Sidenav.Header>
            <Sidenav.Body>
                <Nav>
                    <Nav.Item eventKey="1" active icon={<Icon icon="dashboard" />} href={"/home"}>
                        Home
                    </Nav.Item>
                    <Nav.Item eventKey="2" icon={<Icon icon="group" />} href={"/caronas"}>
                        Caronas
                    </Nav.Item>
                    <Nav.Item eventKey="3" icon={<Icon icon="group" />} href={"/veiculo"}>
                        Veiculos
                    </Nav.Item>
                    <Nav.Item eventKey="4" icon={<Icon icon="group" />} href={"/perfil"}>
                        Perfil
                    </Nav.Item>
                </Nav>
            </Sidenav.Body>

            </Sidenav>
            </Sidebar>
            <Container style={{padding: '2rem'}}>
                <Content >
                {children}
                </Content>
            </Container>
        </Container>
    )
}
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
          <AppLayout>
              <Component {...props}/>
          </AppLayout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/cadastro" component={ SignUp }/>
      <PrivateRoute path="/home" component={ Home } />
      <PrivateRoute path="/caronas" component={ Caronas } />
      <PrivateRoute path="/veiculo" component={ Veiculo } />
      <PrivateRoute path="/perfil" component={ Perfil } />

    </Switch>
  </BrowserRouter>
);

export default Routes;