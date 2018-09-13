import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Griddle, { plugins, RowDefinition, ColumnDefinition,Components} from 'griddle-react';
import Documents from './Documents'
import Develops from './Develops'
import Challenge from './ChallengeGroup'
import Desarrollo from './DesarrolloGrupo'
import {apiTesxt} from './apiConf'
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

function desarrollo({ value, griddleKey, rowData }) {
  return <span>{rowData.id}</span>;
}


const NewLayout = ({ Table, Pagination, Filter, SettingsWrapper }) => (
  <Row>
    <Col md="12" ><Table className="group_table" /></Col>
  </Row>
);
class Grupo extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
       modal: false,
      session:sessionchk,
      id_challenge:"1",
      edita:"0",
      group: [],
      challenge: [],
      participants:[]
    };

  }
  componentDidMount(){
    axios.get(apiTesxt+'/group/detail',{
      params:{
        id: this.props.id
      }
    })
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

     axios.get(apiTesxt+'/group/participants',{
      params:{
        id: this.props.id
      }
    })
   .then((response)=>  {
   if(response.data == 0){
     this.setState({
       participants:[{name:'No hay participantes'}]
      });
   }else{
     this.setState({
       participants: response.data
      });
   }

    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed

     });
     axios.get(apiTesxt+'/group/challenge',{
      params:{
        id: this.props.id
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
      console.log(this.state.challenge)
    // always executed
     });
  }
   toggle(){
    this.setState({
      modal: !this.state.modal
    });
  };
  handleChange(event){
     this.setState({
      modal: !this.state.modal,
      id_challenge: event.target.name,
    });
  }
   handleClick(event){
     this.setState({
      edita: event.target.id,
      id_challenge: event.target.name,
    });
  }
  componentDidUpdate(){
    console.log(this.state.edita)
  }
  handler(e) {
    e.preventDefault()
    this.setState({
      edita: '0'
    })
  }
  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      try{
        if(this.state.edita == 1){
         return(
        <Desarrollo id={this.state.id_challenge} group={this.state.group[0].id} punctuation={this.state.group[0].punctuation} handler={this.handler}/>
          )
        }else{
           return (
      <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
          <ModalBody>
          <Challenge id={this.state.id_challenge}/>
          </ModalBody>

      </Modal>
      <Container fluid="true">
       <Row>
       <Nav/>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">
       <Container className="Contenido_general">
       <Row>
       <Col md="12">
       <h2 className="titulo">GRUPOS</h2><small>Detalle de grupo</small>
       </Col>
       <Row  className="margin_container">
         <Col md="12"><h4 className="subtitulo">INFORMACIÓN DEL GRUPO</h4></Col>
         <Col md="12">
         <Row className="retangle_cont reactangle">
          <Col md="4" xs="12" className="group_image_cont">
           <div className="image_group" style={{backgroundImage: 'url(https://cidpullzonestorage.b-cdn.net/steammakers/grupo/'+this.props.id+'/imagen.png)'}}><div className="logo_group"><img src={'https://cidpullzonestorage.b-cdn.net/steammakers/grupo/'+this.props.id+'/logo.png'}/></div></div>
          </Col>
          <Col md="4" xs="12">
            <h5 className="subtitulo_blue">NOMBRE DEL GRUPO</h5>
            <p>{this.state.group[0].name}</p>
            <h5 className="subtitulo_blue">PUNTAJE GENERAL</h5>
            <h1>{this.state.group[0].punctuation}</h1>
          </Col>
          <Col md="4" xs="12">
            <h5 className="subtitulo_blue">MASTER TEACHER</h5>
            <p>{this.state.group[0].user}</p>
            <h5 className="subtitulo_blue">PARTICIPANTES</h5>
             <ul className="participants_list">{this.state.participants[0].name.replace('[','').replace(']',' ').split(',').map(function(item, i){
            return (<li>{item}</li>)
           })}</ul>
          </Col>
          </Row>
         </Col>
         <Col md="12" className="line ">
         <h4 className="subtitulo">RETOS DESARROLLADOS</h4>
          <p>

     <Griddle components={{Layout: NewLayout}} data={this.state.challenge} plugins={[plugins.LocalPlugin]}>
    <RowDefinition>
      <ColumnDefinition id="name" title="NOMBRE DEL RETO" />
      <ColumnDefinition id="ca" title="FECHA DE PUBLICACIÓN" />
      <ColumnDefinition id="fn" title="FECHA DE FINALIZACIÓN" />
      <ColumnDefinition id="punctuation" title="PUNTAJE GENERAL" />
      <ColumnDefinition id="reto" title="VER RETO" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) => {  return <Button className="ver_table" onClick={this.handleChange.bind(this)}  name={rowData.id}></Button>;})} />
      <ColumnDefinition id="desarrollo" title="DESARROLLO" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) => {  return <Button onClick={this.handleClick.bind(this)} className="ver_table"  name={rowData.id} id="1"></Button>;})} />
    </RowDefinition>
  </Griddle>

          </p>
         </Col>
          <Col md="12" className="margin_container"><Button  className="submit_login" onClick={this.props.handler}>Regresar a la pagina anterior</Button></Col>
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

export default Grupo;
