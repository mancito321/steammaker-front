import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import ShowDoc from './ShowDoc'
import {apiTesxt} from './apiConf'
const axios = require('axios');
class Documents extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      documentation : []
    };
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/challenge/documentation',{
      params:{
        id: this.props.id
      }
    })
   .then((response)=>  {
      this.setState({
       documentation: response.data
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
      return (
         <Row>
         {
           this.state.documentation.map(item=>{
             return <Col md="4" className="documents" key={item.id.toString()}><img src="http://via.placeholder.com/150x150"/><p>{item.cont}</p></Col>
           })
        }
          <ShowDoc retoid={this.props.id}/>

         </Row>
      );
    }
  }


export default Documents;
