import React, { Component } from 'react'
import axios from 'axios';
import { API_ROOT } from './Routes'
import Login from './Login'
import logo from './assets/Acortar.png'
import { Button, PageHeader, Form, Input, Icon, Layout, notification, Table, Modal  } from 'antd';
const { Header, Content, Footer } = Layout;

export default class Panel extends Component {
    constructor(props) {
    super(props);

    this.state = {
        data: []
    }
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);    
    }

    componentDidMount(){
    let url = sessionStorage.getItem('admin') == 'true' ? '/admin/all' : '/acortar/all/' + sessionStorage.getItem("username")
    axios.get(API_ROOT + url)
        .then(res => {
            console.log(res.data)
            let datos = res.data.URLs.map((r,i) => {return {key: i, URLOriginal: r.URLOriginal, URLCorta: `${window.location.hostname }/${r.URLCorta}`, accion: r.URLCorta}});
            console.log(datos)
            this.setState({data: datos});        
        }).catch(error => {
            console.log(error);
        })
    }

    showDeleteConfirm(id) {
        Modal.confirm({
          title: 'Seguro que desea eliminar este URL?',
          okText: 'Borrar',
          okType: 'danger',
          cancelText: 'Cancelar',
          onOk() {
            axios.post(API_ROOT + '/delete/' + id)
            .then(res => {
                window.location.reload()            
            }).catch(error => {
                console.log(error);
            })
          },
          onCancel() {
          },
        });
      }
      

  render() {    
      const columns = [{
        title: 'URL Original',
        dataIndex: 'URLOriginal',
        key: 'URLOriginal',
        render: text => <a href="javascript:;">{text}</a>,
      }, {
        title: 'URL Corta',
        dataIndex: 'URLCorta',
        key: 'URLCorta',
        render: text => <a href="javascript:;">{text}</a>,
      },{
        title: "Acción",
        dataIndex: 'accion',
        key: 'accion',
        render: text => <div>
            <Button type="primary" onClick={() => {sessionStorage.setItem("url", text); this.props.history.push("/url");}} ghost>Ver</Button>
            {sessionStorage.getItem("admin") == 'true' ? <Button type="danger" onClick={() => this.showDeleteConfirm(text)} ghost><Icon type="delete" /></Button> : null}
        </div>,
      }];
      
      
    return (
      <div> 
        <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<img src={logo} onClick={()=>{this.props.history.push("/");}} style={{width: '60%'}} />} subTitle="Siempre corto, nunca largo" 
            extra={<Login history={this.props.history}/>}/>
        </header>  
        <Content style={{ padding: '50px 50px', textAlign: "center" }}>
            <div style={{ marginBottom: 10, textAlign: "end"}}>
                <Button type="danger" onClick={() => this.props.history.push("/")} ghost><Icon type="plus-circle" /> Acortar Nuevo</Button>
            </div>            
            <Table columns={columns} dataSource={this.state.data} />
        </Content>
      </div>
    )
  }
}
