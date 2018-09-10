import React, { Component} from 'react';
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import '../App.css';
import { Route, Redirect } from 'react-router'
const axios = require('axios');

class Log extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM')===null)
    this.state = {
      user: "",
      rol: "",
      email: "",
      password: ""
    };
  }

  validateForm() {
    return true ;
  }

  handleChange (event){
    this.setState({
      [event.target.type]: event.target.value
    });
  }

  handleSubmit = event => {
    axios.post('http://api-sm.cid.edu.co/api/auth/register', {
      user: this.state.text,
      rol: this.state.number,
      email: this.state.email,
      password: this.state.password
    })
    .then( (response) =>{
      console.log(response.data);
      sessionStorage.setItem('mySteamM', JSON.stringify(response.data));
      this.setState({
        session: false
      });
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }

  render() {
    if (this.state.session === false ) {
      return <Redirect to='/me' />
    } else{
      console.log(this.state.logged);
      return (
        <Container>
          <Row>
            <Col>
              <div className="Login">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup id="user">
                    <Label>user</Label>
                    <Input
                      autoFocus
                      type="text"
                      value={this.state.text}
                      onChange={this.handleChange.bind(this)}
                      />
                  </FormGroup>
                     <FormGroup id="rol">
                    <Label>rol</Label>
                    <Input
                      autoFocus
                      type="number"
                      value={this.state.number}
                      onChange={this.handleChange.bind(this)}
                      />
                  </FormGroup>
                     <FormGroup id="email">
                    <Label>email</Label>
                    <Input
                      autoFocus
                      type="email"
                      value={this.state.email}
                      onChange={this.handleChange.bind(this)}
                      />
                  </FormGroup>
                     <FormGroup id="password">
                    <Label>password</Label>
                    <Input
                      autoFocus
                      type="password"
                      value={this.state.password}
                      onChange={this.handleChange.bind(this)}
                      />
                  </FormGroup>
                  <Button
                    block
                    disabled={!this.validateForm()}
                    type="submit"
                    >
                    registar
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      )
    }

  }
}

export default Log;
