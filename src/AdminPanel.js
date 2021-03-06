import React, { Component } from 'react'
import axios from 'axios';
import { API_ROOT } from './Routes'
import Login from './Login'
import logo from './assets/Acortar.png'
import { Button, PageHeader, Form, Input, Icon, Layout, notification, Table  } from 'antd';
const { Header, Content, Footer } = Layout;
var CryptoJS = require("crypto-js");

export default class AdminPanel extends Component {
    constructor(props) {
        console.log(props)
        super(props);
    
        this.state = {
          users: [],
          users_table: []
        }
        this.changeAdmin = this.changeAdmin.bind(this);   
      }

    componentDidMount(){
        if(CryptoJS.AES.decrypt(localStorage.getItem("admin"),'secreto').toString(CryptoJS.enc.Utf8) !== 'true')
            this.props.history.push("/");
        
        axios.get(API_ROOT + '/admin/users?token=' + localStorage.getItem("token"))
        .then(res => {
            let table = res.data.map(usr => { return {username: usr.username, nombre: usr.nombre, admin: {is: usr.administrator, id: usr.username}}})
            this.setState({users: res.data, users_table: table})
        }).catch(error => {
            console.log(error);
        })

    }

    changeAdmin(usr){
        axios.post(API_ROOT + '/admin/change_admin/' + usr + '?token=' + localStorage.getItem("token"))
        .then(res => {
            let table = res.data.map(usr => { return {username: usr.username, nombre: usr.nombre, admin: {is: usr.administrator, id: usr.username}}})
            this.setState({users: res.data, users_table: table})
        }).catch(error => {
            console.log(error);
        })
    }

  render() {
    const columns = [{
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        render: text => <a>{text}</a>,
      }, {
        title: 'Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        render: text => <a>{text}</a>,
      },{
        title: "Admin",
        dataIndex: 'admin',
        key: 'admin',
        render: text => text.id !== CryptoJS.AES.decrypt(localStorage.getItem("username"),'secreto').toString(CryptoJS.enc.Utf8) ? <Button type={text.is == true ? 'primary' : 'danger'} onClick={() => {this.changeAdmin(text.id)}} ghost>{text.is == true ? <Icon type="check-circle" /> : <Icon type="close-circle" />}</Button> : null,
      }];
    return (
      <div>
        <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<img src={logo} onClick={()=>{this.props.history.push("/");}} style={{width: '60%'}} />} subTitle="Siempre corto, nunca largo" 
            extra={<Login history={this.props.history}/>}/>
        </header>  
        <Content style={{ padding: '50px 50px', textAlign: "center" }}>
            <Table columns={columns} dataSource={this.state.users_table} />
        </Content>
      </div>
    )
  }
}
