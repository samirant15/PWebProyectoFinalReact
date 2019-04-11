import React, { Component } from 'react'
import ParticleComponent from "./ParticleComponent";
import { Button, PageHeader, Form, Input, Icon, Layout } from 'antd';
const { Header, Content, Footer } = Layout;


export default class Menu extends Component {
  render() {
    return (        
      <div>          
          <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<h3 style={{padding: 10,borderRadius: 10,backgroundColor:"#E34A6F", color: "#fff"}}>Acortar!</h3>} subTitle="Siempre corto, nunca largo" 
            extra={<LoginForm/>}/>
          </header>     
          <Content style={{ padding: '100px 50px', textAlign: "center" }}>
            <h1 style={{fontSize: "50px",textAlign: "center",textShadow: "0px 2px 4px #949494",fontWeight: "bold"}}>¡WOW, SUS URLs MÁS CORTOS QUE NUNCA!</h1>
            <Input style={{ height: 60,fontSize: 20}} size="large" placeholder="URL a cortar" />
            <Button type="primary" size='large' style={{width: "30%",margin: 20,fontSize: "xx-large",height: "auto"}}>ACORTAR! &nbsp;<Icon type="export" /></Button>
            <h1 style={{marginTop: 50}}><Icon type="fund" theme="twoTone" /> 0 URLs Acortados!</h1>
          </Content>
          <Footer style={{    width: "100%",textAlign: "center",position: "fixed",bottom: 0}}>
            Programación Web: Proyecto Final - © Samir Comprés (2015-0798)
          </Footer>   
          <ParticleComponent />
      </div>
    )
  }
}

const LoginForm = (props) => {
    return (
        <Form layout="inline" onSubmit={()=>{}}>
            <Form.Item><Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" /></Form.Item>
            <Form.Item><Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" /></Form.Item>
            <Form.Item>
            <Button.Group>
                <Button type="primary" htmlType="submit">Log in <Icon type="login" /></Button>
                <Button type="primary" htmlType="submit">Registrarme <Icon type="user-add" /></Button>
            </Button.Group>            
            </Form.Item>
        </Form>
    )
}