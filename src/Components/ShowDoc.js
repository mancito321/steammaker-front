import React, { Component } from 'react';
import {apiTesxt} from './apiConf'
const axios = require('axios');

class ShowDoc extends Component{
  constructor(props) {
    super(props);
    this.state = {
      recursos:[]
    }
  }
componentDidMount (){


}
  componentWillMount(){
    axios.get(apiTesxt+'/api/auth/files',{
      params: {
      id: this.props.retoid  }
    })
    .then( (response) =>{
      // handle success
      let filesPath = []
      response.data.map((file,i)=>{
        filesPath.push(file.Path+file.ObjectName)
      })
      this.setState({
        recursos:filesPath
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
  }
  render(){
    console.log(this.state.recursos);
    return(
      <ul>
        {this.state.recursos.map((file,i)=>{
          let ref ="https://cidpullzonestorage.b-cdn.net"+file.slice(11)
          return(
            <a href={ref} target="_blank">
              <li>{file.slice(38)}</li>
            </a>
          )
        })
        }
      </ul>
    )
  }
}
export default ShowDoc
