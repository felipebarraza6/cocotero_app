import React,{ useState, useEffect, useContext } from 'react'
import api from '../api/endpoints'
import { Skeleton, Typography, Row, 
          Col, Card, Button, Modal, 
          Tag, Input, List, 
          notification, Form } from 'antd'
import {AuthContext} from '../App'

const { Title, Paragraph } = Typography
const { TextArea} = Input

const Blog = () => {

  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState(null)
  const { state } = useContext(AuthContext) 

  const [form] = Form.useForm()

  console.log(state)
  function showModal(module){
  
    Modal.success({
      title:`${module.title}`,
      icon:<></>,
      style: {top:0},
      okText: 'Cerar',
      content: (
        <>
          <center><img src={module.cover_image} style={{width: '400px',borderRadius:'20px'}} alt='img' /></center>
          <Paragraph style={{textAlign:'justify', padding:'10px', marginTop:'20px'}}>
            {module.description}
          </Paragraph>
          <Title level={4}>Comentarios de la comunidad</Title>
            <List itemLayout='horizontal' 
                renderItem={item => ( 
                    <List.Item>
                      <List.Item.Meta 
                        avatar={`@${item.user.username}`}
                        description={item.comment}
                      />
                      {item.response_owner.length > 0 && 
                        <>
                        <Tag color='magenta'>{item.response_owner}</Tag>
                        </>
                      }
                    </List.Item>
                )}
                dataSource={module.comments}>
            </List>

          <Form form={form} layout='horizontal' onFinish={async(values)=> { 
            const post = await api.blogs.create_comment({
                  blog: module.id,
                  user: state.user.id,
                  comment: values.comment
                }).then((r)=> {
                  notification.success({message:'COMENTARIO ENVIADO!'})
                })
            form.resetFields()
          }}>
            <Row>
              <Form.Item name='comment' 
                  rules={[{ required: true, message: 'Escribe tu comentario...'}]} >
                <TextArea placeholder='Escribe tu comentario...' rows='6' style={{width: window.innerWidth < 800 ? '400px': '800px'}} /> 
              </Form.Item>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Button type='primary' htmlType='submit'>Agregar comentario</Button>
          </Row>
          </Form>
        </>
      ),
      width:'1000px'
    })

  }
  
  useEffect(()=> {
  
    async function get_modules(){
      setLoading(true) 
      const request = await api.blogs.get_blogs().then((response)=> {
        setLoading(false)
        setModules(response.data.results)

      })
    
    }

    get_modules()

  }, [])

  return(
    <>
        {loading ? <Skeleton active  paragraph={{ rows: 30 }} /> :
          <>
            {modules.map((module)=> {
              return(
                <Col xs={22} lg={8} style={{margin:'25px', marginTop:window.innerWidth > 800 ? '50px': '0px'}}>
                  <Card 
                    title={module.title}
                    style={{width:window.innerWidth > 800 ? '400px':'100%'}}
                extra={<Tag color='blue'>{module.created.slice(0,10)}</Tag>}
                    cover={ 
                      <img src={module.cover_image} width={'100%'} 
                          alt={module.id} /> 
                      }
                      actions={[
                        <>
                        {module.is_news && <Tag color='blue'>Publicacion</Tag>}
                        {module.is_communicated && <Tag color='volcano'>Anuncio</Tag>}
                        </>,
                        <>
                        {module.url && 
                          <Button type='primary' 
                              onClick={()=>{
                                window.open(module.url)
                              }} 
                                >LINK</Button> 

                        }
                        </>,
                        <Button style={{marginLeft:'5%'}} 
                          onClick={()=>showModal(module)}  
                          type='primary'>Ver</Button>

                      ]} 
                  />
                </Col>
              )

            })}
          </>
        }
    </>
  )

}

export default Blog
