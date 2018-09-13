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
import NuevoDesarrollo from './NuevoDesarrollo'
import Grupos from './Grupo'
import {apiTesxt} from './apiConf'
import Cha from './ChallengeDetail'
import { ChallengeCon } from './ChallengeContext';
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
class Reto extends Component {
  constructor(props) {
    super(props);
    this.handler = this.handler.bind(this)
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
       modal: false,
      session:sessionchk,
      id_challenge:"",
      id_group:"",
      boton:false,
      punctuation:"",
      edita:"0",
      group: [],
      develop: [],
      participants:[],
      development:false
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
     axios.get(apiTesxt+'/challenge/desarrollo',{
      params:{
        id: this.props.id
      }
    })
   .then((response)=>  {
    console.log(response)
      this.setState({
       develop: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {

    // always executed
     });
     axios.get(apiTesxt+'/challenge/boton',{
       params:{
         id_challenge:this.props.id,
         id_grupo:this.props.grupo
       }
     })
    .then((response)=>  {
       if (response.data[0].boton==1) {
         this.setState({
          boton: true
         });
       }
     })
     .catch((error)=>  {
     // handle error
      })
      .then(()=> {
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
  handler(e) {
    e.preventDefault()
    this.setState({
      edita: '0'
    })
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
  // Validamos Submmit

  handleDeve  = ()=>{
    this.setState({
      development:true
    })
  }
  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else if(this.state.development){
      return (
        <NuevoDesarrollo id={this.props.id} />
      )
    }
    else{
      try{
        if(this.state.edita == 1){
         return(
      <Grupos id={this.state.id_group} handler={this.handler}/>
          )
        }else if(this.state.edita == 2){
          return(
      <Desarrollo id={this.state.id_challenge}  group={this.state.id_group} punctuation={this.state.punctuation} handler={this.handler}/>
          )
        }else{

           return (
      <div>
      <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
          <ModalBody>
            <Challenge id={this.state.id_challenge} />


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
       <h2 className="titulo">RETOS</h2><small>Detalle del reto</small>
       </Col>
       <Row  className="margin_container">
         <Col md="12">
         <Row>

           <ChallengeCon>
             {context => {
                return(
                      <Cha id={this.props.id} grupo={context.grupo}/>
                )

            }}
           </ChallengeCon>

          </Row>
         </Col>
         <Col xs="12">
           <ChallengeCon>
             {context => {
                if (context.state==1) {
                  return(
                        <Button onClick={this.handleDeve}   className="submit_login" disabled={this.state.boton} >Desarrollo</Button>
                  )
                }else {
                  return(<div></div>)
                }

            }}
           </ChallengeCon>

         </Col>
         <Col md="12">
         <h4 className="subtitulo">Desarrollos presentados</h4>
          <p>

     <Griddle components={{Layout: NewLayout}} data={this.state.develop} plugins={[plugins.LocalPlugin]}>
    <RowDefinition>
      <ColumnDefinition id="gname" title="Nombre" />
      <ColumnDefinition id="uname" title="Master Teacher" />
      <ColumnDefinition id="ca" title="Fecha" />
      <ColumnDefinition id="reto" title="Ver grupo" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) => {  return <Button onClick={this.handleButton.bind(this)} className="ver_table" id="1" name={rowData.id}></Button>;})} />
      <ColumnDefinition id="desarrollo" title="Ver desarrollo" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) => {  return <Button onClick={this.handleButton.bind(this)} className="ver_table" name={[rowData.id,rowData.chid,rowData.punctuation]} id="2"></Button>;})} />
    </RowDefinition>
  </Griddle>

          </p>
         </Col>
          <Col md="12" className="margin_container" ><Button className="submit_login" onClick={this.props.handler}>Regresar a la pagina anterior</Button></Col>
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

export default Reto;
