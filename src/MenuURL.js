import React, { Component } from 'react'
import axios from 'axios';
import { API_ROOT } from './Routes'
import Login from './Login'
import logo from './assets/Acortar.png'
import { VictoryPie, VictoryChart, VictoryAxis, VictoryArea, VictoryTheme } from "victory";
import { Button, PageHeader, Form, Input, Icon, Layout, Card, Row, Col } from 'antd';
const { Header, Content, Footer } = Layout;
var QRCode = require('qrcode.react');

export default class MenuURL extends Component {
  constructor(props) {
    console.log(props)
    super(props);

    this.state = {
      datos_url: {},
      pieData: [],
      chartData: [],
      ultimo_acceso: 'No Aplica'
    }
    this.arrayRemove = this.arrayRemove.bind(this);    
  }

  arrayRemove(array, item) {

    for(var i = 0; i < array.length; i++){
      if(array[i]==item) {
          array.splice(i,1);
          i--; // Prevent skipping an item
      }
  }
 
 }

  componentDidMount(){
    axios.get(API_ROOT + '/ver/' + localStorage.getItem("url"))
      .then(res => {
        console.log(res.data)
        let browsers = ['IE', 'Safari', 'Opera', 'Chrome', 'Netscape', 'Firefox', 'Otro']
        //PIE DATA
        let pieData = []
        let fechas = []
        for(let i=0; i < browsers.length; i++){
          let cont = 0
          res.data.Accesos.forEach(acceso => {
            if(acceso.navegaor === browsers[i]){
              cont++;
              fechas.push(acceso.fecha.split(' ')[0])
            }                            
          })
          if(cont > 0)
            pieData.push({x: browsers[i], y: cont})
        }
        //ACCESOS POR TIEMPO
        // console.log(fechas)
        let chartData = [];
        for (let i=0; i<fechas.length; i++){
          let cont = 1
          for (let j=0; j<fechas.length; j++){
            if(fechas[i] === fechas[j])
              cont++;
            if(j == fechas.length-1){              
              chartData.push({x: fechas[i], y: cont})
              this.arrayRemove(fechas, fechas[i])
            }              
          } 
        }        
        // console.log(chartData)
        this.setState({datos_url: res.data, ultimo_acceso: res.data.Accesos.length > 0 ? res.data.Accesos[res.data.Accesos.length-1].fecha : 'No Aplica', pieData: pieData, chartData: chartData})        
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div>
        <header id="header" className="clearfix" style={{boxShadow: "0 2px 8px #f0f1f2"}}>
            <PageHeader title={<img src={logo} onClick={()=>{this.props.history.push("/");}} style={{width: '60%'}} />} subTitle="Siempre corto, nunca largo" 
            extra={<Login history={this.props.history}/>}/>
          </header>     
          <Content style={{ padding: '50px 50px', textAlign: "center" }}>            
            <Card
                title={
                <div>
                    <h1 style={{fontSize: "30px",textAlign: "center",textShadow: "0px 2px 4px #949494",fontWeight: "bold"}}>{`${window.location.hostname }/${localStorage.getItem("url")}`}</h1>
                    <p>{this.state.datos_url.URLOriginal}</p>
                </div>}
                extra={<a href="#"><Icon type="right-square" theme="twoTone" style={{fontSize: "30px"}}/></a>}
                style={{ width: "100%" }} type="inner">
                <Row gutter={16}>
                    <Col span={8}>
                        <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                            <strong>URL Original: </strong><p>{this.state.datos_url.URLOriginal}</p>
                            <strong>URL Corta: </strong><p>{`${window.location.hostname }/${localStorage.getItem("url")}`}</p>
                        </div>                
                    </Col>
                    <Col span={8}>
                    <div style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff"}}>
                        <strong>Cantidad de Accesos: </strong><p>{this.state.datos_url.Accesos ? this.state.datos_url.Accesos.length : 0}</p>
                        <strong>Último Acceso: </strong><p>{this.state.ultimo_acceso}</p>
                    </div>                    
                    </Col>
                    <Col span={8}>
                      <QRCode value={localStorage.getItem("url")} />
                    </Col>
                </Row>           
                <Row style={{textAlign: "left", padding: 5,border: 1,borderStyle: "dashed",borderColor: "#1890ff",marginTop:10}}>
                <Col span={12}>
                    <VictoryPie data={this.state.pieData} colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}/>
                  </Col>
                  <Col span={12}>
                  <VictoryChart theme={VictoryTheme.material} >
                      <VictoryArea data={this.state.chartData} style={{ data: { fill: "#c43a31" } }}/>
                      <VictoryAxis/>
                    </VictoryChart>        
                  </Col>
                </Row>     
                </Card>
          </Content>
      </div>
    )
  }
}
