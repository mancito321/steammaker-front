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
  Alert
} from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import Develops from './Develops'
import DropIt from './DropIt'
import {apiTesxt} from './apiConf'
import ShowDoc from './ShowDoc'
const axios = require('axios');

class NuevoDesarrollo extends Component {

  constructor(props) {
    super(props);
    const logg = (sessionStorage.getItem('mySteamM') === null)
    this.state = {
      Retoid:this.props.id,
      RetoS:null,
      Tipo:0,
      Contenido:[],
      NombreC:'',
      FileC:'',
      DescC:'',
      successM:false,
      failM:false,
      recurso:false,
      recursos:[],
      challenge:[]
    };
    this.onDismissu = this.onDismissu.bind(this);
    this.onDismisfail = this.onDismisfail.bind(this);
  }
componentWillMount(){
  console.log('will mount');
  axios.get(apiTesxt+'/api/auth/resources',{
    params: {
    id: this.state.id  }
  })
  .then( (response) =>{
    // handle success
    console.log(response);
    let recursosR =response.data[0].recursos.split(',')
  console.log(recursosR);
  this.setState({
    recursos:recursosR
  })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
    console.log('challenge_ok');
  });
  axios.get(apiTesxt+'/challenge/actual',{
    params:{
      id:this.props.id
    }
  })
 .then((response)=>  {
    this.setState({
     challenge: response.data[0]
    });
  })
  .catch((error)=>  {
  // handle error
   })
   .then(()=> {
   console.log(this.state.challenge);
   });
}
  validateForm() {
      if (this.state.RetoS!=null) {
        return true;
      }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    let formData = new FormData();
    let newContenidos= []
    this.state.Contenido.map((item,i)=>{
      if (item[0]!=null && typeof(item[0])) {
        formData.append(`contenido${i}`, item[0]);
        newContenidos.push(`[${item[1]},${item[2]}]`)
      }else {
        newContenidos.push(`[${item[1]},${item[2]},${item[0]}]`)
      }
    })
    formData.append('Retoid', this.state.Retoid);
    formData.append('Solucion', this.state.RetoS);
    formData.append('Contenidos', newContenidos);
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token':session.token
        }
    }
    console.log(config);
    axios.post(apiTesxt+'/api/auth/solucionreto', formData,config)
    .then( (response) =>{
      document.getElementById('Reto').value = null;
      this.setState({
        RetoS:null,
        Contenido:[]
      })
      this.setState({ successM: true });
      setTimeout(()=>{ window.location.href ="/retos" }, 2000);
    })
    .catch((error) => {
      console.log(error);
      this.setState({ failM: true });
    });
    event.preventDefault();
  }
  handleDropFile=(e)=> {
    this.setState({
      [e.target.name]:e.target.files[0]
    });
  }
  returnBack=(e)=>{
    window.location.href ="/retos"
    e.preventDefault();
  }
  onDismissu(e) {
    console.log(e);
    this.setState({ successM: false });
  }
  onDismisfail(e) {
    console.log(e);
    this.setState({ failM: false });
  }
  toggleRecursos=()=>{
    if (this.state.recurso) {
      this.setState({
        recurso:false
      })
    }else {
      this.setState({
        recurso:true
      })
    }
  }
  render() {
    let ContentIn;
    let recursos;
    if (this.state.Tipo==0) {
      ContentIn = <Col md="12" xs="12">
                                <FormGroup id="contenido">
                                <label for="Contenido">{this.state.fileC != null ? (<div className="documents_imgR background_yes" ><img src={require('../assets/attach.svg')} /></div>):(<div className="documents_imgR"><img src={require('../assets/attach.svg')} /></div>)}</label>
                                  <Label for="exampleFile">Contenido</Label>
                                  <Input type="file" name="fileC" id='Contenido' onChange={this.handleDropFile}/>
                                  <FormText color="muted" className='smallForm'>
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>
    
    }else {
      ContentIn = <FormGroup id="reto">
        <Label for="exampleFile">Enlace de contenido</Label>
        <Input type="text" placeholder="http://" name="FileC" id="file_link" onChange={this.handleChange.bind(this)}/>
      </FormGroup>
    }
    if (this.state.recurso) {
      recursos =<div>{this.state.recursos}</div>
    }else {
      recursos=<div></div>
    }
    if (this.state.session) {
      return <Redirect to='/login'/>
    } else {
      try {
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
                        <h2 className="titulo">Desarrollo del reto</h2>
                        <small>Carga el desarrollo del reto</small>
                      </Col>
                      <Row className="margin_container">
                        <Container>
                          <Row>
                            <Col md="12" xs="12">
                              <h4>
                                {this.state.challenge.name}
                              </h4>
                              <p>
                                {this.state.challenge.contenido}
                              </p>  
                              <hr></hr>                           
                            </Col>
                            <Col md="4" xs="12">
                             <h4>Fecha de creación</h4>
                              <p>{new Date(this.state.challenge.ca).getDate()}/{new Date(this.state.challenge.ca).getMonth()+1}/{new Date(this.state.challenge.ca).getFullYear()}</p></Col>
                            <Col md="4" xs="12">
                              <h4>
                                Documentos
                              </h4>
                              <p>
                              <ShowDoc retoid={this.state.Retoid}/>
                              </p>
                              <Button className="submit_login_2" onClick={this.toggleRecursos}>ver recursos</Button>
                              {
                                (this.state.recurso) ? <p>{this.state.challenge.recursos}</p>:<p></p>
                              }
                            </Col>
                          </Row>
                        </Container>
                      </Row>
                      <Row className="margin_container">
                        <form onSubmit={this.handleSubmit}>
                          <Container >
                            <Row>
                              <Col xs="12">
                                <h5>Desarrollo</h5>
                                <hr></hr>
                              </Col>
                            </Row>
                            <Row>
                              <Col md="12">
                                <Alert className="notificationfix" color="success" isOpen={this.state.successM} toggle={this.onDismissu}>
                                  La solución se ha subido satisfactoriamente
                                </Alert>
                              </Col>
                              <Col md="12">
                                <Alert className="notificationfix" color="danger" isOpen={this.state.failM} toggle={this.onDismisfail}>
                                  Oops! Ha ocurrido un error subiendo la solución
                                </Alert>
                              </Col>
                              <Col md="6" xs="12">

                            <Col md="12" xs="12">
                             <Col md="12" xs="12">
                                <FormGroup id="reto">
                                <label for="Reto">{this.state.RetoS != null ? (<div className="documents_imgR background_yes" ><img src={require('../assets/attach.svg')} /></div>):(<div className="documents_imgR"><img src={require('../assets/attach.svg')} /></div>)}</label>
                                  <Label for="exampleFile">Reto</Label>
                                  <Input type="file" name="RetoS" id="Reto" onChange={this.handleDropFile}/>
                                  <FormText color="muted" className='smallForm'>
                                    Advertencia sobre formato y peso del contenido a cargar
                                  </FormText>
                                </FormGroup>
                              </Col>                              
                              </Col>                                
                              </Col>
                            </Row>
                          </Container>
                          <Container className="form_margin">
                            <Row>
                              <Col md="12"><h5>Contenidos de apoyo</h5></Col>
                              <Col md="12"><small>Carga aquí los contenidos y recursos asociados al reto, puedes elegir entre cargar archivos y enlaces; utiliza la opción archivos para cargar imágenes y documentos, y la opción enlaces para vincular videos y audios de páginas como youtube y soundcloud. Recuerda que el tamaño máximo para cargar archivos es de 5mb.</small><hr></hr></Col>
                            </Row>
                            <Row>
                              <Col xs="12" md="6">
                                <FormGroup id="name">
                                  <Label>Nombre del contenido</Label>
                                  <Input type="text" name="NombreC" id="recurso-name" placeholder="Ingresa el nombre del recurso" onChange={this.handleChange.bind(this)}/>
                                </FormGroup>
                              </Col>
                              <Col xs="12"></Col>
                              <Col xs="12" md="6">
                                <FormGroup>
                                  <Label for="exampleText">Tipo de contenido  </Label>
                                    <Input type="select" name="Tipo" defaultValue={this.state.Tipo} id="ie" onChange={this.handleChange.bind(this)} onClick={this.handleChange.bind(this)} >
                                      <option value='0'>Archivo</option>
                                      <option value='1'>Link</option>
                                    </Input>
                                  </FormGroup>
                                </Col>
                                <Col xs="12"></Col>
                                <Col md="6" xs="12">
                                  {ContentIn}
                                </Col>
                                <Col xs="12">
                                  <FormGroup>
                                    <Label for="exampleText">Descrioción del contenido</Label>
                                    <Input type="textarea"  name="DescC" id="recurso-text" onChange={this.handleChange.bind(this)} />
                                    </FormGroup>
                                </Col>
                                                              </Row>
                              <Row>
                                <Col md="2" xs='12' className="">
                                  <Button className="ingresar_recurso submit_login_2" disabled={!this.validateParticipante()} onClick={this.add_recurso.bind(this)} >Añadir contenido</Button>
                                </Col>
                              </Row>

                            </Container>
                            <Container className="form_margin">
                              <Row>
                                <Col xs="12">
                                  <Col md="12"><div className="header_participants">
                                    <Row>
                                      <Col md="4" className="center">Nombre recurso</Col>
                                      <Col md="4" className="center">Descripción</Col>
                                      <Col md="2" className="center"></Col>
                                      <Col md="2" className="center">Remover</Col>
                                    </Row>
                                  </div></Col>
                                  <Col md="12"><div className="cont_participants">
                                    {
                                      this.state.Contenido.map(function(item, i){
                                        console.log(this.state.Contenido);
                                        return (
                                          <Row key={'Row'+i} key={i}>
                                            <Col md="4" >{item[1]}</Col>
                                            <Col md="4" >{item[2]}</Col>
                                            <Col md="2" ></Col>
                                            <Col md="2"  onClick={this.delete_recurso.bind(this,item)} ><span class="eliminar_button">Eliminar</span></Col>
                                          </Row>
                                        );
                                      }.bind(this))
                                    }
                                  </div></Col>
                                </Col>
                              </Row>
                            </Container>

                            <Container className="form_margin">
                              <Row className="center">
                                <Col md="2">
                                  <Button className="submit_login_2" block disabled={!this.validateForm()} type="submit">
                                    Crear
                                  </Button>
                                </Col>
                                <Col md="2">

                                    <Button className="submit_login_2" onClick={this.returnBack}>
                                      Regresar
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
            <p>
              error
            </p>
          );
        }
      }
    }

    validateParticipante=(e)=>{

      if (this.state.NombreC.length > 0 && this.state.DescC.length > 0){
        return true
      }

    }

    add_recurso() {
      this.state.Contenido.push([this.state.FileC,this.state.NombreC,this.state.DescC]);
      this.setState(this.state)
      this.setState({FileC:null,NombreC:"",DescC: ""})
      document.getElementById('recurso-name').value = "";
      document.getElementById('recurso-text').value = "";
      if(document.getElementById('ie').value == 1){
        document.getElementById('file_link').value = null;
      }else{
        document.getElementById('Contenido').value = null;
      }
      
      
    }

    delete_recurso(i) {
      var array = this.state.Contenido;
      var index = array.indexOf(i);
      array.splice(index,1);
      this.setState(this.state)
    }

  }
  export default NuevoDesarrollo;
