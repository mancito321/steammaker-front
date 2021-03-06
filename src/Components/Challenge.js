import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label } from "reactstrap";
import Nav from './Nav'
import Footer from './Footer'
import Documents from './Documents'
import { Link } from 'react-router-dom'
import Develops from './Develops'
import Reto from './Reto'
import {apiTesxt} from './apiConf'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList, Legend} from 'recharts';
import { ChallengeCon } from './ChallengeContext';
  const axios = require('axios');
  const radius = 10

class Challenge extends Component {

  constructor(props) {
    super(props);
    const sessionchk =sessionStorage.getItem('mySteamM')===null;
    this.state = {
      session:sessionchk,
      challenge : [],
      permission:"",
      reto:false,
      group:[]
    };
  }
  componentDidMount(){
    axios.get(apiTesxt+'/challenge/challenge/last')
   .then((response)=>  {
     console.log('the challenge:');
     console.log(response);
      this.setState({
       challenge: response.data
      });
    })
    .catch((error)=>  {
    // handle error
     })
     .then(()=> {
    // always executed
     });

  }
  retos(){
   this.setState({
          reto: true
         });
  }
   handler(e) {
    e.preventDefault()
    this.setState({
      reto: false
    })
  }

  componentWillMount(){
     let session=JSON.parse(sessionStorage.getItem('mySteamM'))
     axios.get(apiTesxt+'/api/auth/me',{
       headers: {
           'content-type': 'multipart/form-data',
           'x-access-token':session.token
       }
   })
    .then((response)=>  {
       this.setState({
         permission:response.data.rol
       })
     })
     .catch((error)=>  {
     // handle error
     console.log('Fuck '+error);
      })
      .then(()=> {
     console.log(this.state.permission);
      });
      axios.get(apiTesxt+'/group/group/limit')
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
        console.log(this.state.group.length)
  }

  render() {
    console.log('the challenge');
    console.log(this.state.challenge[0]);
    if (this.state.session) {
      return <Redirect to='/login' />
    }else {
      if(this.state.reto){
      return(
          <ChallengeCon>
            {context => {            
               return(
                 <Reto id={this.state.challenge[0].id} grupo={context.grupo} handler={this.handler.bind(this)}/>
               )
           }}
          </ChallengeCon>

          )
      }else{
      try{
        console.log('this is challenge');
        return (
      <div>
      <Container fluid="true">
        <ChallengeCon>
          {context => {
            context.actions.update();
            console.log('Context :');
            console.log(context);
            console.log('done');
           return(
             <div>
             </div>
           )
         }}
        </ChallengeCon>
       <Row>
       <Nav/>
       <Col md="2"></Col>
       <Col md="10" xs="12" className="contenido_general">
       <Container className="Contenido_general">
       <Row>
       <Col md="12" style={{marginBottom:'30px'}}>
       <h2 className="titulo">DASHBOARD</h2><small>Resumen de actividad</small>

       </Col> 
       <Col md="12" style={{marginBottom:'10px'}}><h4 className="subtitulo">Último reto</h4></Col>
       <Row  className="margin_container retangle_cont"> 
       <Col md="12">
         <p><h5 className="retoInfoTitle" >{this.state.challenge[0].name}<span><Button className="submit_login_2 ver_reto" onClick={this.retos.bind(this)}>Ver reto</Button></span></h5></p>
          <p>{this.state.challenge[0].contenido}</p>
          <hr></hr>
       </Col>  
     <Col md="3" xs="12">
            <h5 className="retoInfoTitle" >Documentos</h5>
            <Documents key="document" id={this.state.challenge[0].id}/>
        </Col>
         <Col md="3" xs="12">
            <h5 className="retoInfoTitle" >Desarrollos</h5>
             <Develops key="develops" id={this.state.challenge[0].id}/>
        </Col>
         <Col md="3" xs="12">         
        
          <h5 className="retoInfoTitle" >Fecha de publicación</h5>

        <p>{new Date(this.state.challenge[0].ca).getDate()}/{new Date(this.state.challenge[0].ca).getMonth()+1}/{new Date(this.state.challenge[0].ca).getFullYear()}</p>
             
        </Col> 
        <Col md="3" xs="12">         
        
         <h5 className="retoInfoTitle" >Finalizado</h5>

          <p>{this.state.challenge[0].fn === '0000-00-00' ? '- -' : new Date(this.state.challenge[0].fn).getDate()+'/'+(new Date(this.state.challenge[0].fn).getMonth()+1)+'/'+new Date(this.state.challenge[0].fn).getFullYear() }</p>
             
        </Col>
            
           
      </Row>
      <Row>
     <Col md="12" className="line">  <h2 className="titulo">Ranking</h2><h4 className="subtitulo">Observa a continuación los puntajes y las posiciones de los grupos</h4></Col>
     <Col md="12" >{this.state.group.length == 0 ? (
        <div>
        <h6>Aún no hay grupos, ¿Qué tal si creas uno?</h6>
        <p><Link to="/nuevo_grupo" ><Button className="submit_login_2">Crear un grupo</Button></Link></p>
        </div>        
        ) : (
        <BarChart width={1000} height={300} data={this.state.group} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="puntos" fill="#ffbb11" minPointSize={5}>
        </Bar>
      </BarChart>
        )}</Col>

      </Row>
      </Row>

      </Container>
      </Col>
      </Row>
      </Container>
       <footer><Footer/></footer></div>
      );
      }catch(error){
        console.log(error);
       return(
         <div>
         <ChallengeCon>
           {context => {
             context.actions.update();
             console.log('Context :');
             console.log(context);
             console.log('done');
            return(
              <div>
              </div>
            )
          }}
         </ChallengeCon>
         <Container fluid="true">
          <Row>
          <Col md="2" className="nav_cont"><Nav/></Col>
          <Col md="2"></Col>
          <Col md="10" xs="12" className="contenido_general">
          <Container className="Contenido_general">
          <Row>
          <Col md="12">
          <h2 className="titulo">DASHBOARD</h2><small>Resumen de actividad</small>
          </Col>
          <Row  className="margin_container">
           <h1>NO HAY RETOS!!</h1>
          </Row>
          <Row  className="margin_container">
       <Col md="12">
         {this.state.group.length == 0 ? (
        <div>
        <h6>Aún no hay grupos, ¿Qué tal si creas uno?</h6>
        <p><Link to="/nuevo_grupo" ><Button className="submit_login_2">Crear un grupo</Button></Link></p>
        </div>
        ) : (
        <BarChart width={1000} height={300} data={this.state.group} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="puntos" fill="#ffbb11" minPointSize={5}>
        </Bar>
      </BarChart>
        )}
       </Col>
          </Row>


         </Row>

         </Container>
         </Col>
         </Row>
         </Container>
          <footer><Footer/></footer></div>
        );
      }
      }
    }
  }
}

export default Challenge;
