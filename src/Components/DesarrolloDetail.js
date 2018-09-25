import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import ShowSol from './ShowSol'
import {apiTesxt} from './apiConf'
  const axios = require('axios');
class DesarrolloDetail extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      challenge : []
    };
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/desarrollo',{
      params:{
        id:this.props.id,
        group:this.props.group
      }
    })
   .then((response)=>  {
      this.setState({
       challenge: response.data
      });
      console.log(response.data);
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed
     });
  }

  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      try{
        return (
      <Row  className="margin_container">
         <Col md="6" xs="12">
         <h5>Grupo {this.state.challenge[0].gname}</h5>
          <h5>Fecha de publicación</h5>

        <p>{new Date(this.state.challenge[0].ca).getDate()}/{new Date(this.state.challenge[0].ca).getMonth()+1}/{new Date(this.state.challenge[0].ca).getFullYear()}</p>
             </Col>

        <Col md="4" xs="12">
          <h5>Documentos solución</h5>
          <ShowSol key="document" id={this.props.id} group={this.props.group}/>
      </Col>

      </Row>
      );
      }catch(error){
       return(
        <p></p>
        );
      }
    }
  }
}

export default DesarrolloDetail;
