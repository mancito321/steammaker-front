import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label, CustomInput,Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import {apiTesxt} from './apiConf'
import Filter from './Filter'
import { ChallengeCon } from './ChallengeContext';
import Reto from './Reto'
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




class Retos extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      retos : [],
      retosA : [],
      modal: false,
      edit : [],
      active : false,
      activeA : true,
      detail:"0",
      nombreR:'',
      contenidoR:"",
      fechaR:''
    };
  }
    componentDidMount(){
    axios.get(apiTesxt+'/challenge/challenges')
   .then((response)=>  {
      this.setState({
       retos: response.data
      });
      console.log(this.state.retos);
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
      console.log(this.state.retos)
    // always executed
     });

      axios.get(apiTesxt+'/challenge/challengesAdmin')
   .then((response)=>  {
      this.setState({
       retosA: response.data
      });
      console.log(this.state.retos);
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
      console.log(this.state.retos)
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
  updateActive(){
    axios.post(apiTesxt+'/challenge/active/edit',{
      id:this.state.edit,
      active:this.state.active
    })
   .then((response)=>  {

    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
      console.log(this.state.retos)
    // always executed
     });
       window.location.assign("/retos")
  }

    updateActiveA(){
    axios.post(apiTesxt+'/challenge/active/edit',{
      id:this.state.edit,
      active:this.state.activeA
    })
   .then((response)=>  {

    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
         // always executed
     });
       window.location.assign("/retos")
  }

  handleChange (event){

    this.setState({
      detail: event.target.name,
    });

  }

   handler(e) {
    e.preventDefault()
    this.setState({
      detail: '0'
    })
  }
   toggle(event){
    this.setState({
      modal: !this.state.modal,
       edit: event.target.name,
        active:!this.state.active,
    });
  };
    toggle1(event){
    this.setState({
      modal: !this.state.modal,
      edit: event.target.name,
      activeA:!this.state.activeA,
    });
  };


  render() {

    let GridFixMt=(<Griddle components={{Layout: NewLayout, Filter}} data={this.state.retosA} plugins={[plugins.LocalPlugin]}>
   <RowDefinition>
     <ColumnDefinition id="name" title="Nombre" />
      <ColumnDefinition id="date" title="Inicio" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
        return <span>{new Date(rowData.ca).getDate()}/{new Date(rowData.ca).getMonth()+1}/{new Date(rowData.ca).getFullYear()}</span>;
     })} />
     <ColumnDefinition id="fn" title="Finalizado" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
        return <span>{rowData.fn === '0000-00-00' ? '- -' : new Date(rowData.fn).getDate()+'/'+(new Date(rowData.fn).getMonth()+1)+'/'+new Date(rowData.fn).getFullYear() }</span>;
     })} />
     <ColumnDefinition id="desarrollos" title="Desarrollado" />
     <ColumnDefinition id="verRe" title="Ver reto" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
        return <Button name={rowData.id} className="ver_table" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} ></Button>;
    })} />
         <ColumnDefinition id="ver" title="Opciones" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
          return <div>{rowData.active == 0 ? (<input type="checkbox" name={rowData.id} onClick={this.toggle.bind(this)} />) : (<input type="checkbox"  checked  name={rowData.id} onClick={this.toggle1.bind(this)}/>) }</div>;
           })} />


   </RowDefinition>
 </Griddle>)
 let GridFixSt=(<Griddle components={{Layout: NewLayout, Filter}} data={this.state.retos}  plugins={[plugins.LocalPlugin]}>
<RowDefinition>
  <ColumnDefinition id="name" title="Nombre" />
  <ColumnDefinition id="date" title="Inicio" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
        return <span>{new Date(rowData.ca).getDate()}/{new Date(rowData.ca).getMonth()+1}/{new Date(rowData.ca).getFullYear()}</span>;
     })} />
     <ColumnDefinition id="fn" title="Finalizado" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
        return <span>{rowData.fn === '0000-00-00' ? '- -' : new Date(rowData.fn).getDate()+'/'+(new Date(rowData.fn).getMonth()+1)+'/'+new Date(rowData.fn).getFullYear() }</span>;
     })} />
  <ColumnDefinition id="desarrollos" title="Desarrollado" />
  <ColumnDefinition id="verRe" title="Ver reto" customComponent={enhancedWithRowData(({ value, griddleKey, rowData }) =>{
     return <Button name={rowData.id} className="ver_table" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} ></Button>;
      })} />
</RowDefinition>
</Griddle>)

    if (this.state.session) {
      return <Redirect to='/login' />
    }else {

      try{
      if(this.state.detail>=1){
        return(
          <ChallengeCon>
            {context => {
              console.log('context State');
              console.log(context.state);
               return(
                 <Reto id={this.state.detail} grupo={context.grupo} handler={this.handler.bind(this)}/>
               )

           }}
          </ChallengeCon>

          )

      }else{
          return (
     <div>
      <Container fluid="true">
      <Modal isOpen={this.state.modal} toggle={this.toggle.bind(this)} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={this.toggle.bind(this)}></ModalHeader>
          <ModalBody>
           <p>Esta seguro de hacer esta accion con el reto con id numero: <b>{this.state.edit}</b></p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateActive.bind(this)}>Aceptar</Button>{' '}
            <Button color="secondary" onClick={this.toggle.bind(this)}>Cancelar</Button>
          </ModalFooter>
      </Modal>
       <Modal isOpen={this.state.modal} toggle={this.toggle1.bind(this)} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={this.toggle1.bind(this)}></ModalHeader>
          <ModalBody>
           <p>Esta seguro de hacer esta accion con el reto con id numero: <b>{this.state.edit}</b></p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateActiveA.bind(this)}>Aceptar</Button>{' '}
            <Button color="secondary" onClick={this.toggle1.bind(this)}>Cancelar</Button>
          </ModalFooter>
      </Modal>
       <Row>
     <Nav/>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">
       <Container className="Contenido_general">
       <Row>
       <Col md="12">
       <h2 className="titulo">RETOS</h2><small>Todos los retos</small>
       </Col>
       <Row  className="margin_container">
   <Col md="12" className="table_cont">

     <ChallengeCon>
       {context => {     
            if (context.state==1) {
            if(this.state.retos != undefined){
              return(
                    GridFixMt             )
            }else{
              return(
                <p>Aún no existen retos ¿Has pensado en crear uno?</p>
                )
            }

          }else if (context.state==2) {
             if(this.state.retos != undefined){
              return(
                    GridFixSt
             )
            }else{
              return(
                <p>Aún no existen retos ¿Has pensado en crear uno?</p>
                )
            }
          }

      }}
     </ChallengeCon>

   </Col>
    <ChallengeCon>
               {context => {
                   if (context.state==1) {
                     return(
                         <Col md="12" className="center margin_container"><Link to="/nuevo_reto" ><Button className="submit_login">Crear un reto</Button></Link></Col>

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

export default Retos;
