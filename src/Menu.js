import React, { Component } from 'react'
import axios from 'axios';
import { API_ROOT } from './Routes'
import Login from './Login'
import logo from './assets/Acortar.png'
import ParticleComponent from "./ParticleComponent";
import { Button, PageHeader, Form, Input, Icon, Layout, notification  } from 'antd';
const { Header, Content, Footer } = Layout;


export default class Menu extends Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      url_cortar: '',
      cant_acortados: 0

    }
    this.onChange = this.onChange.bind(this);
    this.acortar = this.acortar.bind(this);
    this.transformRequest = this.transformRequest.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
  }

  componentDidMount(){
    axios.get(API_ROOT + '/acortar/count')
      .then(cant => {
        this.setState({cant_acortados: cant.data})
      }).catch(error => {
        console.log(error);
      })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })    
  }

  acortar(){
    axios.post(API_ROOT + '/acortar', this.transformRequest({
      url: this.state.url_cortar,
      username: localStorage.getItem("username")
    }),{
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
      .then(res => {
        localStorage.setItem("url", res.data.URLCorta)
        this.openNotificationWithIcon('success', 'URL Acortada!', 'Aquí podrá observar las estadísticas de su URL')
        this.props.history.push(res.data.redirect);
        console.log(res);
      }).catch(error => {
        console.log(error);
      })
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
    return (        
      <div>          
          <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<img src={logo} href="/" style={{width: '60%'}} />} subTitle="Siempre corto, nunca largo" 
            extra={<Login history={this.props.history}/>}/>
          </header>     
          <Content style={{ padding: '100px 50px', textAlign: "center" }}>
            <h1 style={{fontSize: "50px",textAlign: "center",textShadow: "0px 2px 4px #949494",fontWeight: "bold"}}>¡WOW, SUS URLs MÁS CORTOS QUE NUNCA!</h1>
            <Input name="url_cortar" style={{ height: 60,fontSize: 20}} size="large" placeholder="URL a cortar" onChange={this.onChange} />
            <Button onClick={() => this.acortar()} type="primary" size='large' style={{width: "30%",margin: 20,fontSize: "xx-large",height: "auto"}}>ACORTAR! &nbsp;<Icon type="export" /></Button>
            <h1 style={{marginTop: 50}}><Icon type="fund" theme="twoTone" />{` ${this.state.cant_acortados} URLs Acortados!`}</h1>
          </Content>
          <Footer style={{    width: "100%",textAlign: "center",position: "fixed",bottom: 0}}>
            Programación Web: Proyecto Final - © Samir Comprés (2015-0798)
          </Footer>   
          {/* <ParticleComponent /> */}
      </div>
    )
  }
}