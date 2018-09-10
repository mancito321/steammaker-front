import React, { Component } from 'react';
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
    axios.get('http://api-sm.cid.edu.co/api/auth/filesSol',{
      params: {
      id: this.props.id,
      group:this.props.group
      }
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
      console.log(this.state.recursos);
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
    return(
      <ul>
        {this.state.recursos.map((file,i)=>{
          let ref ="https://cidpullzonestorage.b-cdn.net"+file.slice(11)
          return(
            <a href={ref} target="_blank">
              <li>{file.slice(46)}</li>
            </a>
          )
        })
        }
      </ul>
    )
  }
}
export default ShowDoc
