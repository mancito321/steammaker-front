import React, {Component} from 'react';
import {Route, Redirect} from 'react-router'
import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  FormText,
  Form,
  Alert,
  CustomInput
} from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import DropIt from './DropIt'
import {apiTesxt} from './apiConf'
const axios = require('axios');

class NuevoReto extends Component {
  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM') === null)
    this.state = {
      NameReto:"",
      TextReto:"",
      activo:false,
      active:0,
      Reto:null,
      Rubrica:null,
      Formato:null,
      recursos: [],
      RecursoName :"",
      RecursoText:"",
      RecursoURL:"",
      successM:false,
      failM:false
    };
  }


  validateForm() {
      if (this.state.NameReto.length > 0 && this.state.TextReto.length > 0 && this.state.Reto != null && this.state.Rubrica != null && this.state.Formato != null){
        return true
      }
  }
  validateReto() {
      if (this.state.RecursoName.length > 0 && this.state.RecursoText.length > 0 && this.state.RecursoURL.length > 0){
        return true
      }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleCheckbox(){
    this.setState({
      activo:!this.state.activo
    },()=>{
      if(this.state.activo == true){
        this.setState({
       active:1
     });
     }else{
     this.setState({
       active:0
     });
     }
    });

  }

  handleSubmit = event => {
    let formData = new FormData();
    console.log(this.state.active);
    formData.append('NameReto', this.state.NameReto);
    formData.append('TextReto', this.state.TextReto);
    formData.append('Reto', this.state.Reto);
    formData.append('Rubrica', this.state.Rubrica);
    formData.append('Formato', this.state.Formato);
    formData.append('activo', this.state.active);
    formData.append('recursos', this.state.recursos);
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    console.log('Creando nueva'+formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token':session.token
        }
    }
    console.log(config);
    console.log();
    axios.post(apiTesxt+'/api/auth/newreto', formData,config)
    .then( (response) =>{
      console.log('this is the response');
      console.log(response);
      this.setState({ successM: true });
      setTimeout(()=>{ window.location.href ="/retos" }, 2000);
    })
    .catch(function (error) {
      console.log('this is error');
      this.setState({ failM: true });
    });

    event.preventDefault();
  }
  handleDropFile=(e)=> {
    this.setState({
      [e.target.name]:e.target.files[0]
    });
  }
  onDismissu(e) {
    console.log(e);
    this.setState({ successM: false });
  }
  onDismisfail(e) {
    console.log(e);
    this.setState({ failM: false });
  }

  render() {
    if (this.state.session) {
      return <Redirect to='/login'/>
    } else {
      try {
        console.log('this is nuevo reto');
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
                        <h2 className="titulo">RETOS</h2>
                        <small>Crear nuevo reto</small>
                      </Col>
                      <Col md="12">
                        <Alert className="notificationfix" color="success" isOpen={this.state.successM} toggle={this.onDismissu}>
                          El reto se ha subido satisfactoriamente
                        </Alert>
                      </Col>
                      <Col md="12">
                        <Alert className="notificationfix" color="danger" isOpen={this.state.failM} toggle={this.onDismisfail}>
                          Oops! Ha ocurrido un error subiendo el reto
                        </Alert>
                      </Col>
                      <Row className="margin_container">
                        <form onSubmit={this.handleSubmit}>
                          <Container>
                            <Row>
                              <Col xs="12" className='retoInfoTitle'>
                                <h5>INFORMACIÓN DEL RETO</h5>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="6" xs="12">
                                <FormGroup id="name" className='formName'>
                                  <Label>Nombre del reto</Label>
                                  <Input type="text" id="name" name="NameReto" placeholder="Ingresa el nombre del reto" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup className='formDesc'>
                                  <Label for="exampleText">Descripción del reto</Label>
                                  <Input type="textarea" name="TextReto" id="exampleText" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col xs="12" className='retoInfoTitle'>
                                <h5>DOCUMENTACIÓN DEL RETO</h5>
                              </Col>

                              <Col md="4" xs="7">
                                <FormGroup id="reto">
                                <label for="Reto">{this.state.Reto != null ? (<div className="documents_imgR background_yes" ><img src={require('../assets/attach.svg')} /></div>):(<div className="documents_imgR"><img src={require('../assets/attach.svg')} /></div>)}</label>
                                  <Label for="exampleFile">Reto</Label>
                                  <Input type="file" name="Reto" id="Reto"  onChange={this.handleDropFile}/>
                                  <FormText color="muted" className='smallForm'>
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>

                              <Col md="4" xs="7">
                                <FormGroup id="rubica">
                                <label for="Rubrica">{this.state.Rubrica != null ? (<div className="documents_imgR background_yes" ><img src={require('../assets/attach.svg')} /></div>):(<div className="documents_imgR"><img src={require('../assets/attach.svg')} /></div>)}</label>
                                  <Label for="exampleFile">Rubrica</Label>
                                  <Input type="file" name="Rubrica" id='Rubrica' onChange={this.handleDropFile}/>
                                  <FormText color="muted" className='smallForm'>
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>

                              <Col md="4" xs="7">
                                <FormGroup id="formato">
                                <label for="Formato">{this.state.Formato != null ? (<div className="documents_imgR background_yes" ><img src={require('../assets/attach.svg')} /></div>):(<div className="documents_imgR"><img src={require('../assets/attach.svg')} /></div>)}</label>
                                  <Label for="exampleFile">Formato de planeación</Label>
                                  <FormText color="muted" className='smallForm'>
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                  <Input type="file" name="Formato" id="Formato" onChange={this.handleDropFile}/>

                                </FormGroup>
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="12"><h5 className="retoInfoTitle">RECURSOS</h5></Col>
                            </Row>
                            <Row>
                              <Col xs="12" md="6">
                                <FormGroup id="name">
                                  <Label>Nombre del recurso</Label>
                                  <Input className="inputs" type="text" name="RecursoName" id="recurso-name" placeholder="Ingresa el nombre del recurso" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                              <Col xs="12">
                                <FormGroup>
                                  <Label for="exampleText">Descripción del recurso</Label>
                                  <Input className="inputs" type="textarea"  name="RecursoText" id="recurso-text" onChange={this.handleChange.bind(this)} />
                                  </FormGroup>
                                </Col>
                                <Col md="6" xs="12">
                                  <FormGroup id="name">
                                    <Label>Enlace del recurso</Label>
                                    <Input className="inputs" type="text" id="recurso-url" name="RecursoURL" placeholder="http://" onChange={this.handleChange.bind(this)}/>
                                  </FormGroup>
                                </Col>
                              </Row>
                              <Row>
                                <Col md="2" xs='12' className="">
                                  <Button className="ingresar_recurso submit_login" disabled={!this.validateReto()} onClick={this.add_recurso.bind(this)} >Guardar</Button>
                                </Col>
                              </Row>

                            </Container>
                            <Container className="form_margin">
                              <Row>
                                <Col xs="12">
                                  <Col md="12"><div className="header_participants">
                                    <Row>
                                      <Col md="4" className="center">Nombre recurso</Col>
                                      <Col md="4" className="center">Contenido</Col>
                                      <Col md="2" className="center">Enlace</Col>
                                      <Col md="2" className="center">Remover</Col>
                                    </Row>
                                  </div></Col>
                                  <Col md="12"><div className="cont_participants">
                                    {
                                      this.state.recursos.map(function(item, i){
                                        console.log(this.state.recursos);
                                        return (
                                          <Row key={'Row'+i}>
                                            <Col md="4" key={i}>{item[0]}</Col>
                                            <Col md="4" key={i}>{item[1]}</Col>
                                            <Col md="2" key={i}>{item[2]}</Col>
                                            <Col md="2" className="linkDelete"key={i} onClick={this.delete_recurso.bind(this,item)} ><span class="eliminar_button">Eliminar</span></Col>
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
                                <Col xs="12">
                                  <h5 className="retoInfoTitle">ESTADO INICIAL DEL RETO</h5>
                                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                                </Col>
                                <Col xs="12"> <CustomInput type="checkbox" onChange={this.handleCheckbox.bind(this)} id="exampleCustomCheckbox" label="Activar" /></Col>
                              </Row>
                            </Container>

                            <Container className="form_margin">
                              <Row className="center">
                                <Col md="2">
                                  <Button className="submit_login" block disabled={!this.validateForm()} type="submit">
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
              <footer><Footer/></footer>
            </div>
          );
        } catch (error) {
          console.log(error);
          return (
            <p></p>
          );
        }
      }
    }

   
    ie() {
      this.setState(this.state)
    }


    add_recurso() {
      console.log(this.state.RecursoName);
      this.state.recursos.push([this.state.RecursoName,this.state.RecursoText,this.state.RecursoURL]);
      this.setState(this.state)
      this.setState({RecursoName:"",RecursoText:"",RecursoURL: ""})
      document.getElementById('recurso-name').value = "";
      document.getElementById('recurso-text').value = "";
      document.getElementById('recurso-url').value = "";
    }

    delete_recurso(i) {
      var array = this.state.recursos;
      var index = array.indexOf(i);
      array.splice(index,1);
      this.setState(this.state)
    }

  }
  export default NuevoReto;
