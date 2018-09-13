import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import {apiTesxt} from './apiConf'
  const axios = require('axios');
class Challenge extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      challenge : []
    };
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/actual',{
      params:{
        id:this.props.id
      }
    })
   .then((response)=>  {
      this.setState({
       challenge: response.data
      });
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
       <Col md="12">
         <p><h5 className="retoInfoTitle" >{this.state.challenge[0].name}</h5></p>
          <p>{this.state.challenge[0].contenido}</p>
          <hr></hr>
       </Col>  
     <Col md="3" xs="12">
            <h5 className="retoInfoTitle" >Documentos</h5>
            <Documents key="document" id={this.state.challenge[0].id}/>
        </Col>
         <Col md="3" xs="12">
            <h5 className="retoInfoTitle" >Desarrollos</h5>
             <Develops key="develops" id={this.state.challenge[0].id}/>
        </Col>
         <Col md="3" xs="12">         
        
          <h5 className="retoInfoTitle" >Fecha de publicación</h5>

        <p>{this.state.challenge[0].ca}</p>
             
        </Col> 
        <Col md="3" xs="12">         
        
         <h5 className="retoInfoTitle" >Finalizado</h5>

          <p>{this.state.challenge[0].fn}</p>
             
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

export default Challenge;
