import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import {apiTesxt} from './apiConf'
const axios = require('axios');
class Documents extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      develops : []
    };
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/challenge/develops',{
      params:{
        id: this.props.id
      }
    })
   .then((response)=>  {
      this.setState({
       develops: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed
    console.log()
     });
  }





  render() {
      return (
         <Row className="develops">
         {
           this.state.develops.map(item=>{
             return <h1>{item.desarrollos}</h1>
           })
        }


         </Row>
      );
    }
  }


export default Documents;
