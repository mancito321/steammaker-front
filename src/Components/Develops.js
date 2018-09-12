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
     });
  }





  render() {
      return (
         <Row className="develops">
         {
           this.state.develops.map(item=>{
             return <Col md="6" key={item.id.toString()}><p><b>{item.group_name}</b><br></br><small>{item.ca}</small></p></Col>
           })
        }


         </Row>
      );
    }
  }


export default Documents;
