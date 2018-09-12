import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Log from './Components/Log';
import Me from './Components/Me';
import Challenge from './Components/Challenge';
import Inicio from './Components/Inicio';
import Reg from './Components/Reg';
import Grupos from './Components/ver_grupo';
import Retos from './Components/ver_reto';
import NuevoGrupo from './Components/NuevoGrupo';
import NuevoReto from './Components/NuevoReto';
import NuevoDesarrollo from './Components/NuevoDesarrollo';
import UpFile from './Components/UpFile';
import {ChallengePro} from './Components/ChallengeContext';
import {apiTesxt} from './Components/apiConf'
import './App.css'
const axios = require('axios');

class App extends Component {
  state = {
    permission:0,
    grupo:0,
    onAction:0,
    session:JSON.parse(sessionStorage.getItem('mySteamM'))
  }
  componentDidMount(){
  console.log('did mount');
  let session=JSON.parse(sessionStorage.getItem('mySteamM'))
  console.log('My session:');
  console.log(session);
  if (session!=null && this.state.permission==0) {

        axios.get(apiTesxt+'/api/auth/me',{
          headers: {
              'content-type': 'multipart/form-data',
              'x-access-token':session.token
          }
      })
       .then((response)=>  {
         console.log('responses: '+response);
          this.setState({
            permission:response.data.rol,
            grupo:response.data.group
          })
        })
        .catch((error)=>  {
        // handle error
        console.log('Fuck '+error);
         })
         .then(()=> {
           console.log('State of Permisson');
           console.log(this.state.permission);
         });
  }
  }
  componentWillMount(){
    console.log('Willmount');
    console.log('will mount on app');
    let session=JSON.parse(sessionStorage.getItem('mySteamM'))
    if (session!=null && this.state.permission==0) {
      this.setState({
        onAction:1
      })
      console.log('entra ??');
          axios.get(apiTesxt+'/api/auth/me',{
            headers: {
                'content-type': 'multipart/form-data',
                'x-access-token':session.token
            }
        })
         .then((response)=>  {
           console.log('responses: '+response);
          this.setState({
              permission:response.data.rol,
              grupo:response.data.group,
              onAction:0
            })
          })
          .catch((error)=>  {
          // handle error
          console.log('Fuck '+error);
           })
           .then(()=> {
             console.log('no no no');
          console.log(this.state.permission);
           });
    }
    console.log('termina component mount');
  }
  componentDidUpdate(){
    console.log('Did update');
  }
  componentWillUpdate(){
    console.log('will update');
    
  }

  render() {
    console.log('this is app');
    console.log(this.state.permission);
    console.log(this.state.grupo);
    if (this.state.onAction == 0) {
      console.log('entra a app');
      return (
        <ChallengePro value={{
            state:this.state.permission,
            grupo:this.state.grupo,
            actions:{
              update:()=>{if (this.state.permission==0) {
                     let session=JSON.parse(sessionStorage.getItem('mySteamM'))
                     axios.get(apiTesxt+'/api/auth/me',{
                       headers: {
                           'content-type': 'multipart/form-data',
                           'x-access-token':session.token
                       }
                   })
                    .then((response)=>  {
                       this.setState({
                         permission:response.data.rol,
                         grupo:response.data.group
                       })
                     })
                     .catch((error)=>  {
                     // handle error
                     console.log('Fuck '+error);
                      })
                      .then(()=> {
                     console.log(this.state.permission);
                      });
              }},
              logOut:()=>{
                console.log('Fuccccckkk');
                this.setState({
                  permission:0
                })
              }

            }
          }}>
        <Router >
            <Switch>
              <Route path='/me' component={this.state.session!=null ?Me:Log} />
              <Route path='/reto' component={this.state.session!=null ?Challenge:Log} />
              <Route path='/inicio' component={this.state.session!=null ?Inicio:Log} />
              <Route path='/nuevo_grupo' component={this.state.session!=null ? (this.state.permission==1 ? NuevoGrupo:Grupos):Log} />
              <Route path='/nuevo_reto' component={this.state.session!=null ? (this.state.permission==1 ? NuevoReto:Challenge):Log} />
              <Route path='/register' component={this.state.session!=null ?Reg:Log} />
              <Route path='/grupos' component={this.state.session!=null ?Grupos:Log} />
              <Route path='/retos' component={this.state.session!=null ?Retos:Log} />
              <Route path='/' component={Log} />
            </Switch>
        </Router>
        </ChallengePro>
      );
    }else {
      return (
        <p></p>
      )
    }
  }
}

export default App;
