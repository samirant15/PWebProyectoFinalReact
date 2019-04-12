import React, { Component } from 'react'
import axios from 'axios';
import { API_ROOT } from './Routes'
import Login from './Login'
import logo from './assets/Acortar.png'
import { Button, PageHeader, Form, Input, Icon, Layout, Card, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;

export default class MenuURL extends Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      datos_url: {},
      ultimo_acceso: 'No Aplica'
    }
    // this.onChange = this.onChange.bind(this);    
  }

  componentDidMount(){
    axios.get(API_ROOT + '/ver/' + sessionStorage.getItem("url"))
      .then(res => {
        console.log(res.data)
        this.setState({datos_url: res.data, ultimo_acceso: res.data.Accesos.length > 0 ? res.data.Accesos[res.data.Accesos.length-1].fecha : 'No Aplica'})        
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<img src={logo} style={{width: '60%'}} />} subTitle="Siempre corto, nunca largo" 
            extra={<Login/>}/>
          </header>     
          <Content style={{ padding: '50px 50px', textAlign: "center" }}>
            
            <Card
                title={
                <div>
                    <h1 style={{fontSize: "30px",textAlign: "center",textShadow: "0px 2px 4px #949494",fontWeight: "bold"}}>{`${window.location.hostname }/${sessionStorage.getItem("url")}`}</h1>
                    <p>{this.state.datos_url.URLOriginal}</p>
                </div>}
                extra={<a href="#"><Icon type="right-square" theme="twoTone" style={{fontSize: "30px"}}/></a>}
                style={{ width: "100%" }} type="inner">
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                            <strong>URL Original: </strong><p>{this.state.datos_url.URLOriginal}</p>
                            <strong>URL Corta: </strong><p>{`${window.location.hostname }/${sessionStorage.getItem("url")}`}</p>
                        </div>                
                    </Col>
                    <Col span={12}>
                    <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                        <strong>Cantidad de Accesos: </strong><p>{this.state.datos_url.Accesos ? this.state.datos_url.Accesos.length : 0}</p>
                        <strong>Último Acceso: </strong><p>{this.state.ultimo_acceso}</p>
                    </div>                    
                    </Col>
                </Row>           
                <Row style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff",marginTop:10}}>
                
                </Row>     
                </Card>
          </Content>
      </div>
    )
  }
}
