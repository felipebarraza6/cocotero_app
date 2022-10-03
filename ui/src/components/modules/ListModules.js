import React,{useEffect, useState, useContext } from 'react'
import { Button , Spin, Tag, Card, Typography, Skeleton } from 'antd';
import { Row, Col} from 'react-flexbox-grid'
import api from '../../api/endpoints'
import { EditOutlined, BookOutlined, CheckSquareFilled } from '@ant-design/icons'

import { ModulesContext } from '../../containers/Modules'
import { AuthContext } from '../../App'

const { Paragraph, Title } = Typography

const ListModules = ({is_free}) => {
  
  const initialState = {
     courses:null,
     loading: true,
     modalCode: false
  }

  const [state, setState] = useState(initialState)
  
  const { dispatch } = useContext(ModulesContext)
  
  const { dispatch:dispatchProfile ,state:profile } = useContext(AuthContext)
  const approved_courses = profile.approved_courses
  console.log(approved_courses)

  useEffect(()=>{
    const get_courses_all = async() => {

      if(is_free){
        const request = await api.courses.get_courses().then((response)=>{
          setState({
            ...state,
            courses: response.results,
            loading: false
          }) 
        })
      }else {
        const request = await api.courses.get_courses_authorized().then((response)=>{
          setState({
            ...state,
            courses: response.results,
            loading: false
          }) 
        })
      }       

      const get_profile = await api.user.get_profile(profile.user.username).then((response)=>{
        const access_token = JSON.parse(localStorage.getItem('access_token') || null)
        const user = response.user
        dispatchProfile({
          type:'LOGIN',
          payload:{
            access_token,
            user
          }
        })
      
      })
      return { get_profile}
    }
    get_courses_all()
  },[])

  return (
    <>
    {state.loading ?
            <Skeleton active avatar paragraph={{ rows: 20 }} />:
        <Row around='xs'>
          {state.courses.map((obj)=> {
            let approved_cour = false
            return(
              <Col key={obj.id}  style={{marginBottom:'20px'}} >
                <Card 
                  key={obj.id}
                  hoverable
                  cover={ <img src={obj.image} style={styles.Image} alt={obj.tutor_name} /> }
                  style={{width: window.innerWidth > 800 ? '350px':'100%', margin: window.innerWidth > 800 ? '20px': '0px'}}
                  bordered={false}
                  actions={[
                    <>                    
                      <Button 
                        type='primary'
                        onClick={()=>dispatch(
                          {
                            type:'SET_VIEW', 
                            is_retrieve:true, 
                            module:obj, 
                            id_module: obj.id,
                            is_approved: false
                          })}><EditOutlined />Ir al curso</Button>
                    </>,
                  ]}
                >
                  <Row>
                    <Col span={24}>
                      <Title level={3}>{obj.title}  
                      {approved_courses.filter(e => e.course.id === obj.id).length > 0 && 
                        <CheckSquareFilled style={{marginLeft:'10px', color:'green'}} />
                      }
                      </Title>
                    </Col>
                    <Col span={24} >
                      <Paragraph align={'justify'}>{obj.description}</Paragraph> 
                    </Col>
                  </Row>
              </Card>
            </Col>
          )
          })}
        </Row>
    }
    </>
  )

}

const styles = {
  Spin:{
  },
  Image: {
    width:'100%',
  },
  ColImage: {
    marginTop:'-15px'
  }
}


export default ListModules
