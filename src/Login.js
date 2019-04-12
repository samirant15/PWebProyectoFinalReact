import React, { Component } from 'react'
import { Button, Modal, Form, Input, Icon, Tooltip, Dropdown, Menu, notification } from 'antd';
import axios from 'axios';
import { API_ROOT } from './Routes'
var CryptoJS = require("crypto-js");

export default class Login extends Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      loading: false,
      login_user: '',
      login_pass: '',
      nombre: '',
      username: '',
      password: '',
      registerModal: false

    }
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.transformRequest = this.transformRequest.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })    
  }

  login(){
    axios.post(API_ROOT + `/autenticar/${this.state.login_user}/${this.state.login_pass}`)
      .then(res => {
        if(res.data.usuario){
          this.openNotificationWithIcon('success', `Bienvenido ${res.data.usuario}!`, '')
          localStorage.setItem("username", CryptoJS.AES.encrypt(res.data.usuario, 'secreto'));
          localStorage.setItem("admin", CryptoJS.AES.encrypt(res.data.admin.toString(), 'secreto'));
          localStorage.setItem("url", "");
          this.props.history.push("/panel");
        }        
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
  }

  register(){
    axios.post(API_ROOT + '/registrar', this.transformRequest({
      username: this.state.username,
      password: this.state.password,
      nombre: this.state.nombre,
    }),{
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        if(res.data.usuario){
          this.openNotificationWithIcon('success', `Usuario ${res.data.usuario} Registrado!`, 'Aquí podrá ver sus URLs')
          localStorage.setItem("username", CryptoJS.AES.encrypt(res.data.usuario, 'secreto'));
          localStorage.setItem("admin", CryptoJS.AES.encrypt(false, 'secreto'));
          localStorage.setItem("url", "");
          this.props.history.push("/panel");
        }   
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
    this.setState({registerModal: false})
  }

  transformRequest = (jsonData = {}) =>
  Object.entries(jsonData)
    .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
    .join('&');

    openNotificationWithIcon = (type, msj, desc) => {
      notification[type]({
        message: msj,
        description: desc,
      });
    };

  render() {
    // console.log("ADMIN: " + CryptoJS.AES.decrypt(localStorage.getItem("admin"),'secreto').toString(CryptoJS.enc.Utf8).toString(CryptoJS.enc.Utf8))
    const menuCuenta = (
      <Menu>
          {CryptoJS.AES.decrypt(localStorage.getItem("admin"),'secreto').toString(CryptoJS.enc.Utf8) == 'true' ? <Menu.Item key="1" onClick={()=>{this.props.history.push("/admin");}}><Icon type="setting" /> Opciones Admin</Menu.Item> : null}
          <Menu.Item key="2" onClick={()=>{this.props.history.push("/panel");}}><Icon type="file-done" /> Mis URLs</Menu.Item>          
          <Menu.Item key="3" onClick={()=>{localStorage.setItem("username",""); localStorage.setItem("url",""); localStorage.setItem("admin",""); this.props.history.push("/");}}><Icon type="logout" /> Cerrar Sesión</Menu.Item>          
      </Menu>
    );
    return (
    <div>
      {CryptoJS.AES.decrypt(localStorage.getItem("username"),'secreto').toString(CryptoJS.enc.Utf8) ? <Dropdown overlay={menuCuenta}><Button>{CryptoJS.AES.decrypt(localStorage.getItem("username"),'secreto').toString(CryptoJS.enc.Utf8)}<Icon type="down" /></Button></Dropdown> :
        <div>      
        <Form layout="inline">
          <Form.Item><Input name="login_user" value={this.state.login_user} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={this.onChange} placeholder="Username" /></Form.Item>
          <Form.Item><Input name="login_pass" value={this.state.login_pass} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={this.onChange} type="password" placeholder="Password" /></Form.Item>
          <Form.Item>
          <Button.Group>
              <Button type="primary" onClick={() => this.login()}>Log in <Icon type="login" /></Button>
              <Button type="primary" onClick={() => this.setState({registerModal: true})}>Registrarme <Icon type="user-add" /></Button>                
          </Button.Group>            
          </Form.Item>
        </Form>

        <Modal title="Registrarme" visible={this.state.registerModal} onOk={() => this.register()} onCancel={() => this.setState({registerModal: false})}>
          <Form layout="inline">
            <Form.Item label="Nombre">
              <Input name="nombre" value={this.state.nombre} prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={this.onChange} placeholder="Nombre" />
            </Form.Item>                  
            <Form.Item label={(<span>Usuario&nbsp;<Tooltip title="Debe ser único!"><Icon type="question-circle-o" /></Tooltip></span>)}>
              <Input name="username" value={this.state.username} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={this.onChange} placeholder="Usuario" />
            </Form.Item>
            <Form.Item label="Contraseña">
            <Input name="password" value={this.state.password} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} onChange={this.onChange} placeholder="Contraseña" type="password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" style={{width: "100%"}} onClick={() => this.register()}>Registrame!</Button>
            </Form.Item>
          </Form>        
        </Modal>
      </div>            
      }
    </div>    
    )
  }
}
