import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Griddle, { plugins, RowDefinition, ColumnDefinition,Components} from 'griddle-react';
import {apiTesxt} from './apiConf'
import { connect } from 'react-redux';
import { ChallengeCon } from './ChallengeContext';
const axios = require('axios');
const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <Row>
    <Col md="12" ><Table className="group_table" /></Col>
  </Row>
);
const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});
const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};
class Desarrollo extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      desarrollo : []
    };
  }
  handleButton (event){
    let variable = event.target.name.split(',')


      console.log(variable[1])
    this.setState({
      edita: event.target.id,
      id_challenge: variable[1],
      id_group: variable[0],
      punctuation: variable[2],
    });
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/desarrolloChallenge',{
      params:{
        idChall: this.props.id,
        idGroup: this.props.group
      }
    })
   .then((response)=>  {
     console.log(this.props.id)
     console.log(this.props.group)
      this.setState({
       desarrollo: response.data
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
         <div><h4 className="subtitulo">Desarrollo presentado</h4> {this.state.desarrollo.length == 0 ? (
                  
                  <div><h6>Aún no has cargado el desarrollo de este reto</h6>
                       </div>
       
                  ) : (
                 <Griddle components={{Layout: NewLayout}} data={this.state.desarrollo} plugins={[plugins.LocalPlugin]}>
                   <RowDefinition>
                     <ColumnDefinition id="gname" title="Nombre" />
                     <ColumnDefinition id="uname" title="Master Teacher" />
                     <ColumnDefinition id="date" title="Fecha" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
                          return <span>{new Date(rowData.ca).getDate()}/{new Date(rowData.ca).getMonth()+1}/{new Date(rowData.ca).getFullYear()}</span>;
                      })} />                  
                   </RowDefinition>
                 </Griddle>
               )}</div>
      );
    }
  }


export default Desarrollo;
