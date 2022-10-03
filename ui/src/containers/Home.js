
//React 
import React, { useState, useEffect } from 'react'

//Antd
import { Layout, Menu, Spin, Row, Col } from 'antd'

// Antd Icons
import { CheckCircleOutlined,  
  BankOutlined, FileDoneOutlined, DollarCircleOutlined,
  SafetyOutlined, 
  RocketOutlined} from '@ant-design/icons'

//Build
import logo from '../assets/img/white.png'

//Components
import MenuHeader from '../components/home/MenuHeader'
import Modules from './Modules'
import Profile from './Profile'
import Blog from './Blog'
import ClassesHeld from './ClassesHeld'
import LearningRoute from './LearningRoute'


// React Router
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
const { Header, Content, Sider } = Layout


const Home = () =>{
        
        const [reload, setReload] = useState(false)

       
        return(
          <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>            
<Row>
          <Col>
          </Col>
          </Row>
            <Sider collapsed={window.innerWidth > 800 ? false:true} width='250px'>
              <div style={{padding:'10px', paddingTop: window.innerWidth > 800 ? '20px': '50px'}}>
                
              {window.innerWidth > 800 && 
                  <img alt='logo' style={styles.logo}  src={logo} />
                 }
              </div>
              
              <Menu 
                  theme="dark" 
                  mode="inline"
                  defaultSelectedKeys={['1']}
              >
                              <Menu.Item key="1" 
                    style={styles.menuItem} 
                    icon={window.innerWidth < 800 && <BankOutlined />}
                    onClick={()=> {
                      setReload(true)
                      setTimeout(() => {
                        setReload(false)
                      }, 1000)
                  }}  >
                    <Link to="/">
                      Cursos Gratis 
                     </Link>
                </Menu.Item>                 
            <Menu.Item key="2" 
                    icon={window.innerWidth < 800 && <DollarCircleOutlined />}
                    style={styles.menuItem} onClick={()=> {
                    setReload(true)
                    setTimeout(() => {
                      setReload(false)
                    }, 1000)
                }} >
                    <Link to="/buy">
                      Cursos Comprados 
                     </Link>
                </Menu.Item>

                
                                {window.innerWidth > 800 &&
                <Menu.Item style={styles.menuItem} >
                    <Link to="/classes_held">
                      Clases Realizadas
                    </Link>
                </Menu.Item>}
                <Menu.Item style={styles.menuItem} icon={window.innerWidth < 800 && <RocketOutlined /> } >
                    <Link to="/route">
                      Cursos Completados
                    </Link>
                </Menu.Item>
              </Menu>
              
            </Sider>

            <Layout>              
            <Header >
              <MenuHeader />
            </Header>
              <Content>
              <div style={styles.content}>
                  <Switch>  
                  <Row align='center'>
                    
                    <Route exact path='/buy'>
                      <Col style={{ margin:'20px'}}>
                      {!reload ?  
                        <Modules is_free={false} />: <center><Spin size='large' /></center>
                      }</Col>
                    </Route>
                    <Col style={{margin:'20px'}} >
                    <Route exact path='/'>
                      {!reload ? 
                        <Modules is_free={true} />: <center><Spin size='large' /></center>
                      }
                    </Route>
                    </Col>
                    <Col style={{marginTop: window.innerWidth > 800 ? '0':'-60px'}}>
                      <Route exact path='/profile' component={Profile} />
                    </Col>
                    <Col>
                    <Route exact path='/blog' component={Blog} />
                    </Col>
                    {window.innerWidth > 800 && 
                    <Col>
                    <Route exact path='/classes_held' component={ClassesHeld} />
                    </Col>}
                    <Col>
                    <Route exact path='/route' component={LearningRoute} />
                    </Col>
          </Row>
                 </Switch>
            </div>
              </Content>              
            </Layout>

          </Layout>
          </BrowserRouter>

                            
        )
    }

const styles = {
  menuItem: {
    marginBottom:'20px'
  },
  icon: {
    marginRight:'5px',
    fontSize:'20px'
  },
  logo: {
    width: window.innerWidth > 800 ? '100%':'70%',
    marginBottom:'70px'
  },
  content: {
    padding: '0px'
  }
}

export default Home
