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
      isOpen: false,
      nav: false
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
  nav_mov() {
     this.setState({
      nav: !this.state.nav
    });
    if(this.state.nav){
       document.getElementById("nav_cont").style.left = "-240.2px";
    }else{
     document.getElementById("nav_cont").style.left = "0px";
    } 
  }

  render() {

    return (
      <div>
      <Col md="12" className="nav_mov" id="nav_mov" onClick={this.nav_mov.bind(this)}>
        <div className="burger"></div>
      </Col>    

      <Col md="2" className="nav_cont" id="nav_cont">
      <div className="mountain_nav">
      <div className="trees_nav">
      <Container fluid="fluid">      
        <img className="image_logo" src={require('../assets/steam_makers.png')}/>     
      <Row>

        <Col md="12" xs="12">
          <div className='VertMenu'>
            <div className='menuItem'>
              <Link to="/reto">
                <span className="icon_nav"><img src={require('../assets/trophy.svg')}/></span>
                Inicio</Link>
            </div>

                <Nav className="ml-auto menuItem" navbar="navbar">
            <UncontrolledDropdown inNavbar>
              <DropdownToggle nav="nav" caret="caret">
                <span className="icon_nav"><img src={require('../assets/chronometer.svg')}/></span>
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
                <span className="icon_nav"><img src={require('../assets/groups_config.svg')}/></span>
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
                      <span className="icon_nav"><img src={require('../assets/exit.svg')}/></span>
                      <span className="icon_nav">Salir</span>
                    </Link>)

                }
              }
            </ChallengeCon>
            </div>

          </div>
        </Col>
      
      </Row>
    </Container>
      </div>
      </div>
      </Col>
      </div>
      );
  }
}

export default Header;
