import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../App.css';
import { Container, Row, Col,Button, FormGroup, Input , Label, Navbar, Nav,NavbarBrand,NavItem,NavLink} from "reactstrap";
import { Route, Redirect } from 'react-router'

class Inicio extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk
    };

  }
  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      console.log('this is inicio');
      return (
        <div>



          <Container fluid='true'>
            <Row>
              <Col sm='1'>
                <Navbar color="faded" light>
                  <NavbarBrand href="/">reactstrap</NavbarBrand>
                  <Nav navbar>
                    <NavItem>
                      <NavLink href="/components/">Components</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink href="https://github.com/reactstrap/reactstrap">Github</NavLink>
                    </NavItem>
                  </Nav>
                </Navbar>
              </Col>
              <Col>
                <Container>
                  <Row className='marginT'>
                    <h2>
                    DASHBOARD
                  </h2>
                  </Row>
                  <Row>
                    <p>
                      Resumen de actividad
                    </p>
                  </Row>
                  <Row className='marginT'>
                    <Col sm='4'>
                      <p>
                        Text
                      </p>
                    </Col>
                    <Col sm='4'>
                      <p>
                        Text
                      </p>
                    </Col>
                    <Col sm='4'>
                      <p>
                        Text
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }

  }
}

export default Inicio;
