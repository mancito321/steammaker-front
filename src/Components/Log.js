import React, { Component} from 'react';
import { Container, Row, Col,Button, FormGroup, Input , Label ,Alert} from "reactstrap";
import '../App.css';
import { Route, Redirect } from 'react-router'
import {apiTesxt} from './apiConf'
const axios = require('axios');

class Log extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM')===null)
    this.state = {
      text: "",
      password: "",
      session:logg,
      failM:false
    };
  }

  validateForm() {
    return this.state.text.length > 0 && this.state.password.length > 0;
  }

  handleChange (event){
    this.setState({
      [event.target.type]: event.target.value
    });
  }

  handleSubmit (event) {
    axios.post(apiTesxt+'/api/auth/login', {
      user: this.state.text,
      password: this.state.password
    })
    .then( (response) =>{
      console.log('My response:');
      console.log(response);
      console.log('My response.data:');
      console.log(response.data);
      sessionStorage.setItem('mySteamM', JSON.stringify(response.data));
      this.setState({
        session: false
      });
      window.location.reload();
    })
    .catch( (error)=> {
      console.log(error);
       this.setState({ failM: true });
    });
    event.preventDefault();
  }

  render() {
    if (this.state.session === false) {
      return <Redirect to='/reto' />
    } else{
      console.log('this is log');
      return (
  <div className="login_body">
  <div className="mountain">
  <div className="trees">
      <Container fluid="true">
         <Row className="center_full">          
            <Col md="6" xs="12" >
            <Container>
            <Row>
              <Col md="12"> <Alert  color="danger" isOpen={this.state.failM} toggle={this.onDismisfail}>
                        Oops! Ha ocurrido un error revisa tu usuario y contraseña e intenta de nuevo!
                  </Alert></Col>
            </Row>
              <div className="Login">
              <div className="logo_login"><img src={require('../assets/steam-makers.png')} /></div>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <FormGroup id="text">                   
                    <span><img src={require('../assets/user.svg')} /></span><Input
                      autoFocus
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange.bind(this)}
                      placeholder="Ingresa tú nombre de usuario"
                      />
                  </FormGroup>
                  <FormGroup id="password">                   
                    <span><img src={require('../assets/hold.svg')} /></span><Input
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                      type="password"
                      placeholder="Ingresa tú contraseña"
                      />
                  </FormGroup>
                  <Button
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    className="submit_login"
                    >
                    Login
                  </Button>          
                </form>
              </div>
              </Container>
            </Col>
          </Row>
        </Container>
        </div>
        </div>
        </div>
      )
    }

  }
}

export default Log;
