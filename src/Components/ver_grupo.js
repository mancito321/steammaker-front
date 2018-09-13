import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Grupos from './Grupo'
import Filter from './Filter'
import {apiTesxt} from './apiConf'

import { ChallengeCon } from './ChallengeContext';
import Griddle, { plugins, RowDefinition, ColumnDefinition,Components} from 'griddle-react';
var LocalPlugin = require('griddle-react').plugins.LocalPlugin;
const axios = require('axios');
const rowDataSelector = (state, { griddleKey }) => {
  return state
    .get('data')
    .find(rowMap => rowMap.get('griddleKey') === griddleKey)
    .toJSON();
};
const enhancedWithRowData = connect((state, props) => {
  return {
    // rowData will be available into MyCustomComponent
    rowData: rowDataSelector(state, props)
  };
});
function id({ value, griddleKey, rowData }) {
  return <span>{rowData.id}</span>;
}


const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <Row>
    <Col md="12" className="right"><Filter /></Col>
    <Col md="12" ><Table className="group_table" /></Col>
  </Row>
);

class Group extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      group : [],
      detail:"0"
    };
  }

   handler(e) {
    e.preventDefault()
    this.setState({
      detail: '0'
    })
  }
  componentDidMount(){
    axios.get(apiTesxt+'/group/group')
   .then((response)=>  {
      this.setState({
       group: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {

    // always executed
     });

    }
    componentWillReceiveProps(nextProps){
  if (nextProps.location.state === 'edita') {
      this.setState({
       detail: 0
    });
   }
  }


  handleChange (event){
    this.setState({
      detail: event.target.name
    });
    console.log('este es el grupo:');
    console.log(event.target.name);
  }


  tooltip(text){

  console.log(text)
  }
  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {

      try{
      if(this.state.detail>=1){
        return(
          <Grupos id={this.state.detail} handler={this.handler.bind(this)}/>
          )

      }else{
          return (
     <div>
      <Container fluid="true">
       <Row>
       <Nav/>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">
       <Container className="Contenido_general">
       <Row>
       <Col md="12">
       <h2 className="titulo">GRUPOS</h2><small>Todos los grupos</small>
       </Col>
       <Row  className="margin_container">
   <Col md="12" className="table_cont">
     <Griddle components={{Layout: NewLayout, Filter }} data={this.state.group} plugins={[plugins.LocalPlugin]}>
    <RowDefinition>
       <ColumnDefinition id="logo" title="Logo" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
         return <img   className="logo_grupos" src={'https://cidpullzonestorage.b-cdn.net/steammakers/grupo/'+rowData.id+'/logo.png'} />;
          })} />
      <ColumnDefinition id="name" title="Nombre" />
      <ColumnDefinition id="iname" title="Institución Educativa" />
      <ColumnDefinition id="frname" title="Sede" />
      <ColumnDefinition id="nombre" title="Master Teacher" />
      <ColumnDefinition id="participantes" title="Participantes" />
      <ColumnDefinition id="ver" title="Ver grupo" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
         return <Button className="ver_table" name={rowData.id} onMouseOver={this.tooltip.bind(this,'ver')} onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} ></Button>;
          })} />
    </RowDefinition>
  </Griddle>
   </Col>
   <ChallengeCon>
               {context => {
                   if (context.state==1) {
                     return(
   <Col md="12" className="center margin_container"><Link to="/nuevo_grupo" ><Button className="submit_login">Crear un grupo</Button></Link></Col>

                     )
                   }
                 }}
 </ChallengeCon>
      </Row>

      </Row>

      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div>
      );
      }
      }catch(error){
       return(
        <p></p>
        );
      }
    }

  }

}

export default Group;
