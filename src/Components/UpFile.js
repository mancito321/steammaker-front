import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'
import { Container, Row, Col,Button, FormGroup, Input , Label,FormText,Form } from "reactstrap";
import Dropzone from 'react-dropzone'
import {apiTesxt} from './apiConf'
const axios = require('axios');

class UpFile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileBoot: [],
      files:[],
      text:''
    };
  }
  onDrop(files) {
    console.log(files);
    this.setState({
      files
    });
  }
  validateForm(){
    return true
  }
  handleSubmit = event => {
    const {fileBoot, files} = this.state;
    console.log(fileBoot);
    console.log(files);
    let formData = new FormData();
    console.log(formData);
    formData.append('imageOne', fileBoot);
    formData.append('imageTwo', files);
    formData.append('text', this.state.text);
    console.log(formData);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    axios.post(apiTesxt+'/api/auth/newfiletest', formData,config)
    .then( (response) =>{

      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    event.preventDefault();
  }
  handleDropFile=(e)=> {
    console.log(e.target.files[0]);
    console.log(e.target.name);
    this.setState({
      [e.target.name]:e.target.files[0]
    });
  }
  handleChange=(e)=> {
    this.setState({
      [e.target.name]:e.target.value
    });
  }
  render(){
    return(
      <Container>
        <Row>
          <Form onSubmit={this.handleSubmit}>
            <Col xs='12'>
              <FormGroup id="reto">
                <Label for="exampleFile">Reto</Label>
                <Input type="file" name="fileBoot" ref="attachments" id="foto" onChange={this.handleDropFile}/>
                <FormText color="muted">
                  Advertencia sobre formato y peso del contenido a cargar
                </FormText>
              </FormGroup>
            </Col>
            <Col xs='12'>
              <FormGroup id="otro">
                <Label for="exampleFile2">Reto</Label>
                <Input type="file" name="files" ref="attachments2" id="foto2" onChange={this.handleDropFile}/>
                <FormText color="muted">
                  Advertencia sobre formato y peso del contenido a cargar
                </FormText>
              </FormGroup>
            </Col>
            <Col xs='12'>
              <FormGroup id="name">
               <Label>Nombre ejemplo</Label>
               <Input  type="text" name='text' id="name"  onChange={this.handleChange} />
             </FormGroup>
            </Col>
            <Col md="12">
              <Button block disabled={!this.validateForm()} type="submit" >
                Crear
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    )
  }

}
export default UpFile;
