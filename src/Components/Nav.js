import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom'
import '../App.css';

import { ChallengeCon } from './ChallengeContext';
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import { Collapse,  Navbar,  NavbarToggler,  NavbarBrand,  Nav,  NavItem,  NavLink,  UncontrolledDropdown,  DropdownToggle,  DropdownMenu,  DropdownItem } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange (event){
    this.setState({
      detail: event.target.name
    });

  }
  render() {
    return (
      <Container>
      <Row>
         <Col md="12" xs="12" className="logo"><img src="http://via.placeholder.com/350x150"/></Col>
      </Row>
      <Row>
      <Col md="12" xs="12">
        <Navbar color="light" light expand="md">
         <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to="/reto">Inicio</Link></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Retos
                </DropdownToggle>
                <DropdownMenu right>

                <ChallengeCon>
                  {context => {
                   if (context.state==1) {
                     return(
                       <NavLink name="0" onClick={this.handleChange.bind(this)}>
                      <DropdownItem>
                          <Link to="/nuevo_reto">Nuevo reto</Link>
                      </DropdownItem>
                      </NavLink>
                     )
                   }
                 }}
                </ChallengeCon>
                 <NavLink  name="0" onClick={this.handleChange.bind(this)}>
                <DropdownItem>
                    <Link to={{pathname: "/retos", state: "edita"}}>Ver retos</Link>
                </DropdownItem>
                </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
               <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Grupos
                </DropdownToggle>
                <DropdownMenu right>
                <ChallengeCon>
                  {context => {
                   if (context.state==1) {
                     return(
                       <NavLink>
                       <DropdownItem>
                         <Link to="/nuevo_grupo">Nuevo Grupo</Link>
                      </DropdownItem></NavLink>
                     )
                   }
                 }}
                </ChallengeCon>
                 <NavLink name="0" onClick={this.handleChange.bind(this)}>
                <DropdownItem>
                    <Link to={{pathname: "/grupos", state: "edita"}}>Ver Grupos</Link>
                </DropdownItem>
                </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <NavItem>
                  <ChallengeCon>
                    {context => {
                       return(
                         <NavLink onClick={()=>{sessionStorage.removeItem('mySteamM');context.actions.logOut();}}><Link to="/">Salir</Link></NavLink>
                       )

                   }}
                  </ChallengeCon>
              </NavItem>

            </Nav>
          </Collapse>
        </Navbar>
        </Col>
      </Row>
</Container>
    );
  }
}

export default Header;
