import React, {Component} from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom'
import '../App.css';
import './styles.css';

import {ChallengeCon} from './ChallengeContext';
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label
} from "reactstrap";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleChange(event) {
    this.setState({detail: event.target.name});

  }
  render() {
    return (<Container fluid="fluid" className='Mask'>
      <Row>
        <Col md="12" xs="12" className="logo"><img src={require('../assets/steam_makers.png')}/></Col>
      </Row>
      <Row>

        <Col md="12" xs="12">
          <div className='VertMenu'>
            <div className='menuItem'>
              <Link to="/reto">
                <span><img src={require('../assets/assets/icons/trophy.svg')}/></span>
                Inicio</Link>
            </div>

                <Nav className="ml-auto menuItem" navbar="navbar">
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav="nav" caret="caret">
                <span><img src={require('../assets/assets/icons/chronometer.svg')}/></span>
                Retos
              </DropdownToggle>
              <DropdownMenu>

                <ChallengeCon>
                  {
                    context => {
                      if (context.state == 1) {
                        return (<NavLink name="0" onClick={this.handleChange.bind(this)}>
                          <Link to="/nuevo_reto">
                            <DropdownItem>
                              Nuevo reto
                            </DropdownItem>
                          </Link>
                        </NavLink>)
                      }
                    }
                  }
                </ChallengeCon>
                <NavLink name="0" onClick={this.handleChange.bind(this)}>
                  <Link to={{
                      pathname: "/retos",
                      state: "edita"
                    }}>
                    <DropdownItem>
                      Ver retos
                    </DropdownItem>
                  </Link>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
            </Nav>
            <Nav className="ml-auto menuItem" navbar="navbar">
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav="nav" caret="caret">
                <span><img src={require('../assets/assets/icons/groups_config.svg')}/></span>
                Grupos
              </DropdownToggle>
              <DropdownMenu right="right">
                <ChallengeCon>
                  {
                    context => {
                      if (context.state == 1) {
                        return (<NavLink>
                          <Link to="/nuevo_grupo">
                            <DropdownItem>
                              Nuevo Grupo
                            </DropdownItem>
                          </Link>
                        </NavLink>)
                      }
                    }
                  }
                </ChallengeCon>
                <NavLink name="0" onClick={this.handleChange.bind(this)}>
                  <Link to={{
                      pathname: "/grupos",
                      state: "edita"
                    }}>
                    <DropdownItem>
                      Ver Grupos
                    </DropdownItem>
                  </Link>
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
            <div className='menuItem'>
            <ChallengeCon>
              {
                context => {
                  return (
                    <Link to="/" onClick={() => {
                        sessionStorage.removeItem('mySteamM');
                        context.actions.logOut();
                      }}>
                      <span><img src={require('../assets/assets/icons/exit.svg')}/></span>
                      <span>Salir</span>
                    </Link>)

                }
              }
            </ChallengeCon>
            </div>

          </div>
        </Col>
      </Row>
    </Container>);
  }
}

export default Header;
