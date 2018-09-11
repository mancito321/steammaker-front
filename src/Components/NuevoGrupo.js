import {apiTesxt} from './apiConf'
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label,FormText,Alert,Tooltip  } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
const axios = require('axios');
class NuevoGrupo extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM')===null)
    this.state = {
      ie: "0",
      franchise:"0",
      name: "",
      usuario: "",
      password: "",
      repassword: "",
      numero_participantes: 0,
      participante:"",
      participantes:[],
      franchises : [],
      institutions : [],
      error_name:"",
      error_name_2:"",
      fotog:null,
      logog:null,
      fotogVal:false,
      logogVal:false,
      nameVal:false,
      nameVal2:false,
      successM:false,
      tooltipOpen: false,
      failM:false,
      error: false
    };
    this.onDismissu = this.onDismissu.bind(this);
    this.onDismisfail = this.onDismisfail.bind(this);
  }
 toggle() {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }
  validateForm() {
    if (this.state.franchise>0 && this.state.institutions.length>0 && this.state.name.length>0 && this.state.participantes.length>0  && this.state.usuario.length>0 && this.state.password.length>0 && (this.state.repassword === this.state.password)) {
      return true
    }
  }
  validateFormP() {
    if (this.state.participante.length>0) {
      return true
    }
  }
  franchiseForm() {
    return this.state.ie > 0;
  }
  franchiseForm() {
     return this.state.ie > 0;
  }


  handleChange (event){
     this.setState({
      [event.target.id]: event.target.value
    },()=>{
      if(this.state.repassword === this.state.password){     
    this.setState({
     error: false
    });
    }else{    
     this.setState({
      error: true
     });
    }
     if(this.state.error_name >0){
      this.setState({
        nameVal: true
      });
     }else{
      this.setState({
        nameVal: false
      });
     }
     if(this.state.error_name_2 >0){
      this.setState({
        nameVal2: true
      });
     }else{
      this.setState({
        nameVal2: false
      });
     }
    });

    axios.get(apiTesxt+'/group/franchises',{
      params:{
        id: this.state.ie
      }
    })
    .then((response)=>  {
      this.setState({
        franchises: response.data
      });
    })
    .catch((error)=>  {
      // handle error
    })
    .then(()=> {
      // always executed
    });

     axios.get(apiTesxt+'/group/busy',{
      params:{      
        valor: this.state.name
      }
    })
    .then((response)=>  {
      this.setState({
        error_name: response.data[0]['contador']
      });     
     console.log(this.state.nameVal)

    })
    .catch((error)=>  {
      // handle error
    })
    .then(()=> {
      // always executed
    }); 

     axios.get(apiTesxt+'/group/busyUser',{
      params:{      
        valor: this.state.name
      }
    })
    .then((response)=>  {
      this.setState({
        error_name_2: response.data[0]['contador']
      });     
     console.log(this.state.nameVal)

    })
    .catch((error)=>  {
      // handle error
    })
    .then(()=> {
      // always executed
    });



  }


  componentDidMount(){

    axios.get(apiTesxt+'/group/institution')
    .then((response)=>  {
      this.setState({
        institutions: response.data
      });
    })
    .catch((error)=>  {
      // handle error
    })
    .then(()=> {
    });



  }
 componentDidUpdate(){
  console.log(this.state.participantes)

 }

  handleSubmit = event => {
    console.log({
      user: this.state.usuario,
      ie: this.state.text,
      franchise:this.state.franchise,
      name: this.state.name,
      usuario: this.state.usuario,
      password: this.state.password,
      participantes:this.state.participantes,
      imagen: this.state.fotog,
      logo:this.state.logog,
    });
    let formData = new FormData();
    formData.append('user', this.state.usuario);
    formData.append('ie', this.state.text);
    formData.append('franchise', this.state.franchise);
    formData.append('name', this.state.name);
    formData.append('usuario', this.state.usuario);
    formData.append('password', this.state.password);
    formData.append('participantes', this.state.participantes);
    formData.append('imagen', this.state.fotog);
    formData.append('numero_participantes', this.state.numero_participantes);
    formData.append('logo', this.state.logog);
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'x-access-token':session.token
      }
    }
    console.log(config);
    axios.post(apiTesxt+'/api/auth/newgroup', formData,config)
    .then( (response) =>{
      console.log(response);
      this.setState({
        ie: "0",
        franchise:"0",
        name: "",
        usuario: "",
        password: "",
        participante:"",
        participantes:[],
        franchises : [],
        institutions : [],
        fotog:null,
        logog:null,
      });
      this.setState({ successM: true });
    })
    .catch(function (error) {
      console.log(error);
      this.setState({ failM: true });
    });
    window.location.replace("/grupos");
    event.preventDefault();
  }

  handleDropFile=(e)=> {
    if (e.target.files[0]!==undefined) {
      if (e.target.files[0].type.split('/')[0] == 'image') {
        this.setState({
          [e.target.name]:e.target.files[0],
          [`${e.target.name}Val`]:false
        });
      }else {
        this.setState({
          [`${e.target.name}Val`]:true
        });
      }
    }

  }

  onDismissu(e) {
    this.setState({ successM: false });
  }
  onDismisfail(e) {
    this.setState({ failM: false });
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
                <Col md="2" className="nav_cont"><Nav/></Col>
                <Col md="2"></Col>
                <Col md="10" xs="12" className="contenido_general">
                  <Container className="Contenido_general">
                    <Row>
                      <Col md="12">
                        <h2 className="titulo">GRUPOS</h2><small>Crea un nuevo grupo</small>
                      </Col>
                      <Row  className="margin_container">
                        <form onSubmit={this.handleSubmit}>
                          <Container>
                            <Row>
                              <Col md="12">
                                <Alert className="notificationfix" color="success" isOpen={this.state.successM} toggle={this.onDismissu}>
                                  El grupo se ha registrado satisfactoriamente
                                </Alert>
                              </Col>
                              <Col md="12">
                                <Alert className="notificationfix" color="danger" isOpen={this.state.failM} toggle={this.onDismisfail}>
                                  Oops! Ha ocurrido un error registrando el grupo
                                </Alert>
                              </Col>
                              <Col md="3" xs="12">
                                <FormGroup>
                                  <Label>Institucion Educativa *</Label>
                                  <Input type="select" name="select" defaultValue={this.state.ie} id="ie" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >
                                    <option value='0'>Seleccione una institución</option>
                                    {
                                      this.state.institutions.map(function(item, i){
                                        return (
                                          <option value={item.id} key={i}>{item.name}</option>
                                        );
                                      }.bind(this))
                                    }
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col md="3" xs="12">
                                <FormGroup >
                                  <Label>Sede</Label>
                                  <Input type="select" disabled={!this.franchiseForm()} name="select"  id="franchise" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >
                                    <option value='0'>Seleccione una sede  *</option>
                                    {
                                      this.state.franchises.map(function(item, i){
                                        return (
                                          <option   value={item.id} key={i}>{item.name}</option>
                                        );
                                      }.bind(this))
                                    }
                                  </Input>
                                </FormGroup>
                              </Col>

                            </Row>
                            <Row>
                              <Col md="3" xs="12">
                                <FormGroup id="name">
                                  <Label>Nombre del grupo  *</Label>
                                  <Input  type="text" id="name"  onChange={this.handleChange.bind(this)} />
                                    <Alert color="danger" isOpen={this.state.nameVal}>
                                    El nombre del grupo ya existe!
                                  </Alert>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="12"><h5>PARTICIPANTES  *</h5></Col>
                            </Row>
                            <Row>
                              <Col md="3" xs="12">
                                <FormGroup id="name_participant">
                                  <Label>Nombre Completo</Label>
                                  <Input  type="text"  id="participante"  onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                                <Col md="12" className="center"> <Button className="ingresar_participante" disabled={!this.validateFormP()} onClick={this.add_participante.bind(this)} >ingresar</Button></Col>
                              </Col>
                              <Col md="9" xs="12">
                                <Col md="12"><div className="header_participants">
                                  <Row>
                                    <Col md="9" className="center">Nombre</Col>
                                    <Col md="3" className="center">Remover</Col>
                                  </Row>
                                </div></Col>
                                <Col md="12"><div className="cont_participants">
                                  {
                                    this.state.participantes.map(function(item, i){
                                      return (
                                        <Row key={'Row'+i}>
                                          <Col md="10" key={item}>{item}</Col>
                                          <Col md="2" key={i} onClick={this.delete_participante.bind(this,item)} ><span class="eliminar_button">Eliminar</span></Col>
                                        </Row>
                                      );
                                    }.bind(this))
                                  }
                                </div></Col>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="6">
                                <FormGroup id="participantes">
                                  <Label for="exampleFile">Foto de los participantes *</Label>
                                  <Input type="file" name="fotog"  onChange={this.handleDropFile} />

                                  <FormText color="muted">
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                  <Alert color="danger" isOpen={this.state.fotogVal}>
                                    Revisa el archivo subido. Debe ser una imágen
                                  </Alert>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6">
                                <FormGroup id="logo">
                                  <Label for="exampleFile">Logo del grupo *</Label>
                                  <Input type="file" name="logog"  onChange={this.handleDropFile} />
                                  <FormText color="muted">
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                  <Alert color="danger" isOpen={this.state.logogVal}>
                                    Revisa el archivo subido. Debe ser una imágen
                                  </Alert>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="12"><h5>ACCESO</h5></Col>
                            </Row>
                            <Row>
                              <Col md="3" xs="12">
                                <FormGroup id="user">
                                  <Label>Usuario de grupo *</Label>
                                  <Input  type="text"  id="usuario" onChange={this.handleChange.bind(this)} />
                                  <FormText color="muted">
                                    Caracteristicas del nombre de usuario
                                  </FormText>
                                  <Alert color="danger" isOpen={this.state.nameVal}>
                                    El usuario del grupo ya existe!
                                  </Alert>
                                </FormGroup>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="3" xs="12">
                                <FormGroup id="password">
                                  <Label>Clave de grupo *</Label>
                                  <Input  type="password" id="password" value={this.state.password} onChange={this.handleChange.bind(this)} />
                                  <FormText color="muted">
                                    Caracteristicas de la clave de grupo
                                  </FormText>
                                </FormGroup>
                              </Col>
                              <Col md="3" xs="12">
                                <FormGroup id="password">
                                  <Label>Confirmar clave de grupo *</Label>
                                  <Input  type="password" id="repassword" value={this.state.Repassword} onChange={this.handleChange.bind(this)} />
                                  <FormText color="muted">
                                   <Alert color="danger" isOpen={this.state.error}>
                                    Las contraseñas no coiciden!
                                  </Alert>
                                  </FormText>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row className="center">
                              <Col md="2">
                                <Button block disabled={!this.validateForm()} type="submit" >
                                  Crear
                                </Button>
                              </Col>

                            </Row>
                          </Container>
                        </form>
                      </Row>
                    </Row>

                  </Container>
                </Col>
              </Row>
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


    participante(event){
      this.setState({
        participante: event.target.value
      })
    }

    add_participante(){
      this.state.participantes.push(this.state.participante)
      this.setState(
        this.state
      )
      this.setState({
        participante: "",
        numero_participantes: this.state.participantes.length
      })

      document.getElementById('participante').value = "";
    }

    delete_participante(i){
      var array = this.state.participantes;
      var index = array.indexOf(i);
      delete array[index];
      this.setState(
        this.state
      )
    }
  }

  export default NuevoGrupo;
