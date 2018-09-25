import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label,Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Cha from './ChallengeGroup'
import DesarrolloDetail from './DesarrolloDetail'
import { ChallengeCon } from './ChallengeContext';
import {apiTesxt} from './apiConf'
import { RadarChart,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Radar,Legend} from 'recharts';

  const axios = require('axios');
class Challenge extends Component {
  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      modal: false,
      modals: false,
      chall: false,
      session:sessionchk,
      edit:'',
      valor1:0,
      valor2:0,
      valor3:0,
      valor4:0,
      valor5:0,
      valor1p:0,
      valor2p:0,
      valor3p:0,
      valor4p:0,
      valor5p:0,
      valor1e:"",
      valor2e:"",
      valor3e:"",
      valor4e:"",
      valor5e:"",
      punctuation:0,
      challenge : []
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modals: !this.state.modals
    });
  }  modalSol() {
      this.setState({
        chall: !this.state.chall
      });
    }


  validateForm() {
    return this.state.valor1e.length == 0 && this.state.valor2e.length == 0 && this.state.valor3e.length == 0 && this.state.valor4e.length == 0 && this.state.valor5e.length == 0 ;
  }
  componentDidMount(){
    axios.get(apiTesxt+'/group/challengedeep',{
      params:{
        id:this.props.id,
        group:this.props.group
      }
    })
   .then((response)=>  {
     console.log(response);
      this.setState({
       challenge: response.data,
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
        this.setState({
       edit: this.state.challenge[0].edit,
       punctuation:this.state.challenge[0].punctuation,
       valor1p:this.state.challenge[0].formato,
       valor2p:this.state.challenge[0].bigart,
       valor3p:this.state.challenge[0].fotografico,
       valor4p:this.state.challenge[0].video,
       valor5p:this.state.challenge[0].equipo,
      });
    // always executed
     });

  }
   handleInputChanged(e){
    switch(e.target.id) {
    case 'valor1':
    if(e.target.value > 15){
    this.setState({
      valor1e: 'El numero ingresado es mayor a 15',
    });
    }else{
       this.setState({
                valor1: Number(e.target.value),
                valor1p: (Number(e.target.value)*100)/15,
                 valor1e: '',
            });
    }
        break;
    case 'valor2':
    if(e.target.value > 30){
     this.setState({
      valor2e: 'El numero ingresado es mayor a 30',
    });
    }else{
       this.setState({
                valor2: Number(e.target.value),
                valor2p: (Number(e.target.value)*100)/30,
                valor2e: '',
            });
    }
        break;
    case 'valor3':
    if(e.target.value > 25){
     this.setState({
      valor3e: 'El numero ingresado es mayor a 25',
    });
    }else{
      this.setState({
                valor3: Number(e.target.value),
                valor3p: (Number(e.target.value)*100)/25,
                valor3e: '',
            });
    }
        break;
    case 'valor4':
    if(e.target.value > 20){
     this.setState({
      valor4e: 'El numero ingresado es mayor a 20',
    });
    }else{
      this.setState({
                valor4: Number(e.target.value),
                 valor4e: '',
                valor4p: (Number(e.target.value)*100)/20
            });
    }
        break;
    case 'valor5':
    if(e.target.value > 10){
     this.setState({
      valor5e: 'El numero ingresado es mayor a 10',
    });
    }else{
      this.setState({
                valor5: Number(e.target.value),
                 valor5e: '',
                valor5p: (Number(e.target.value)*100)/10
            });
    }
        break;
    default:
        this.setState({
                punctuation: 0
            });
         }
 }
 handleInputClick(){
   let suma=this.state.valor1+this.state.valor2+this.state.valor3+this.state.valor4+this.state.valor5
   this.setState({
    punctuation: suma,
    modal: !this.state.modal
  })
  console.log(this.state.punctuation+' '+suma);
 }

handleButtonChange(event){

  axios.post(apiTesxt+'/challenge/punctuation',{
        id:this.props.id,
        punctuation:this.state.punctuation,
        punctuationT:this.state.punctuation+this.props.punctuation,
        editar:'none',
        group:this.props.group,
        formato: this.state.valor1p,
        bigart: this.state.valor2p,
        fotografico: this.state.valor3p,
        video: this.state.valor4p,
        equipo: this.state.valor5p,
    })
   .then((response)=>  {
      this.setState({
                edit: 'none'
            });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed

     });
      this.setState({
    modal: !this.state.modal
  })
}

  render() {
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      try{
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
       <h2 className="titulo">GRUPOS</h2><small>Detalle de grupo - Solucion de reto</small>

       </Col>
       <Col md="12"><h4 className="subtitulo">INFORMACIÓN DEL DESARROLLO</h4></Col>
       <Row  className="margin_container retangle_cont reactangle">
       
        <Col md="6">
        <h5 className="retoInfoTitle">Fecha de publicación</h5>
        <p>{new Date(this.state.challenge[0].ca).getDate()}/{new Date(this.state.challenge[0].ca).getMonth()+1}/{new Date(this.state.challenge[0].ca).getFullYear()}</p>
        </Col>
        <Col md="6">
        <h5 className="retoInfoTitle">{this.state.challenge[0].name}</h5>
        <Button   className="submit_login_2" onClick={this.toggle}>Ver reto</Button>
        </Col>
        <Col md="12">  <h5 className="retoInfoTitle">Ver desarrollo</h5>
        <Button   className="submit_login_2" onClick={this.modalSol.bind(this)}>Ver Desarrollo</Button>
        <hr></hr>
      </Col>  


        <ChallengeCon>
          {context => {
            console.log('Context :');
            console.log(context);
           if (context.state==1) {
             return(
               <Col md="4" className={this.state.edit}>
               <h5 className="retoInfoTitle">Puntuar reto</h5>
               <Row>
                 <Col md="8">Formato<p className="red">{this.state.valor1e}</p></Col>
                 <Col md="4">
                  <p><Input id="valor1" placeholder="0"  type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>

                 </Col>
                 <Col md="8">Big Art <p className="red">{this.state.valor2e}</p></Col>
                  <Col md="4">
                  <p><Input id="valor2" placeholder="0"  type="number" className="text_group"  onChange={this.handleInputChanged.bind(this)}/></p>

                 </Col>
                 <Col md="8">Registro fotográfico  <p className="red">{this.state.valor3e}</p></Col>
                  <Col md="4">
                  <p><Input id="valor3" placeholder="0"  type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>

                 </Col>
                 <Col md="8">Video<p className="red">{this.state.valor4e}</p></Col>
                  <Col md="4">
                  <p><Input id="valor4" type="number"  placeholder="0" className="text_group"  onChange={this.handleInputChanged.bind(this)}/></p>

                 </Col>
                 <Col md="8">Evidencia del trabajo en equipo<p className="red">{this.state.valor5e}</p></Col>
                  <Col md="4">
                  <p><Input  placeholder="0" id="valor5" type="number" className="text_group" onChange={this.handleInputChanged.bind(this)} /></p>

                 </Col>
                 <Col xs="12">
                   <Button    className="submit_login_2" disabled={!this.validateForm()} onClick={this.handleInputClick.bind(this)}>Puntuar</Button>
                 </Col>
               </Row>

               </Col>
             )
           }
         }}
        </ChallengeCon>
        <Col md="4">
        <h5 className="center retoInfoTitle">Puntaje general</h5>
        <h1 className="center">{this.state.punctuation}</h1>
        </Col>
        <Col md="4">
         <h5 className="center retoInfoTitle">Puntaje por area</h5>
<RadarChart outerRadius={90} width={420} height={250} data={[
    { subject: 'Formato', A: this.state.valor1p,  fullMark: 15 },
    { subject: 'Big Art', A: this.state.valor2p, fullMark: 30 },
    { subject: 'Registro fotográfico', A: this.state.valor3p,  fullMark: 25 },
    { subject: 'Video', A: this.state.valor4p, fullMark: 20 },
    { subject: 'Evidencia del trabajo en equipo', A: this.state.valor5p,  fullMark: 10 },
]}>
  <PolarGrid />
  <PolarAngleAxis dataKey="subject" />
  <PolarRadiusAxis angle={30} domain={[0, 100]}/>
  <Radar name="SteamMaker" dataKey="A" stroke="#6c757d" fill="#6c757d" fillOpacity={0.6} />

  <Legend />
</RadarChart>
      </Col>
        <Col md="12" className="center"> <Button   className="submit_login_2"onClick={this.props.handler}>Regresar</Button></Col>

      </Row>
        <Col md="12" className="margin_container form_margin "></Col>

      </Row>
      </Container>
      </Col>
      </Row>
        <Modal isOpen={this.state.modal} toggle={this.handleInputClick.bind(this)} className='modal-dialog-centered modal-xs'>
          <ModalHeader toggle={this.handleInputClick.bind(this)}>CONFIRMACIÓN DE PUNTAJE</ModalHeader>
          <ModalBody>
            ¿Está seguro de registrar el puntaje ingresado? tenga en cuenta que luego de confirmar el puntaje no podrá cambiarlo
          </ModalBody>
          <ModalFooter>
            <Button   className="submit_login_2" color="primary" onClick={this.handleButtonChange.bind(this)}>Confirmar</Button>{' '}
            <Button   className="submit_login_2" color="secondary" onClick={this.handleInputClick.bind(this)}>Cancelar</Button>
          </ModalFooter>
        </Modal>
         <Modal isOpen={this.state.modals} toggle={this.toggle} className='modal-dialog-centered modal-lg'>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
          <Cha id={this.state.challenge[0].id_challenge}/>
          </ModalBody>
        </Modal>
        <Modal isOpen={this.state.chall} toggle={this.modalSol.bind(this)} className='modal-dialog-centered modal-lg'>
         <ModalHeader toggle={this.modalSol.bind(this)}></ModalHeader>
         <ModalBody>
         <DesarrolloDetail id={this.state.challenge[0].id_challenge} group={this.state.challenge[0].id_group} />
         </ModalBody>
       </Modal>
      </Container>
       <footer><Footer/></footer></div>

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
