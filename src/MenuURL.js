import React, { Component } from 'react'
import Login from './Login'
import logo from './assets/Acortar.png'
import { Button, PageHeader, Form, Input, Icon, Layout, Card, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;

export default class MenuURL extends Component {
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
                    <h1 style={{fontSize: "30px",textAlign: "center",textShadow: "0px 2px 4px #949494",fontWeight: "bold"}}>samscode.tech/blabla</h1>
                    <p>http://google.com</p>
                </div>}
                extra={<a href="#"><Icon type="right-square" theme="twoTone" style={{fontSize: "30px"}}/></a>}
                style={{ width: "100%" }} type="inner">
                <Row gutter={16}>
                    <Col span={12}>
                        <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                            <strong>URL Original: </strong><p>http://google.com</p>
                            <strong>URL Corta: </strong><p>samscode.tech/blabla</p>
                        </div>                
                    </Col>
                    <Col span={12}>
                    <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                        <strong>Cantidad de Accesos: </strong><p>352</p>
                        <strong>Último Acceso: </strong><p>11/04/2019</p>
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