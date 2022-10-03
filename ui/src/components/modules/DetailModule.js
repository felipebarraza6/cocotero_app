import React, { useContext, useEffect, useState } from 'react'
import { Steps ,PageHeader, Tooltip,  Row, Col, Tag, Spin, Typography } from 'antd'
import ReactPlayer  from 'react-player'
import { ModulesContext } from '../../containers/Modules'
import api from '../../api/endpoints'
import { FileTwoTone } from '@ant-design/icons'
import Evaluation from './Evaluation'
import NavigateMenuCourse from './NavigateMenuCourse'
import RetrieveVideo from './RetrieveVideo'
import { AuthContext } from '../../App'
const { Paragraph, Title } = Typography
const { Step } = Steps


const DetailModule = () => {
  
  const [state, setState] = useState({
    modules:null,
    questions: null,
    title: null,
    video: null,
    is_last: false,
    resources: null,
    promotional_video: null,
    promotional_description: null,
    description: null,
    file_promotional: null,

  })

  const { dispatch, state:stateModules } = useContext(ModulesContext)
  const { state:auth } = useContext(AuthContext)
  var is_approved = stateModules.is_approved
  var id_module = stateModules.module.id
  var approved_courses = auth.user.profile.approved_courses 

  useEffect(()=> {

    async function get_module_retrieve(id_module) {
      const request = await api.courses.get_retrieve_course(id_module).then((response)=> {
        approved_courses.filter((element)=> { 
            if(element.course.id===id_module) { 
              dispatch({
                type:'SET_APPROVED',
                is_approved: true
              })
            } 
      }
      )
         
        setState({
          ...state,
          modules: response.modules,
          questions: response.questions,
          title: response.title,
          description: response.description,
          promotional_description: response.description_promotional,
          promotional_video: response.promotional_video,
          file_promotional: response.file_promotional,
        })
        }
      )
    }
    get_module_retrieve(id_module)

  }, [])


  return(
    <>
      <Row around='xs'>
        <Col>
          <PageHeader 
            title={`${stateModules.module.title}`}
            onBack = {()=> dispatch({
                type:'SET_VIEW', 
                is_retrieve: false, 
                module: null, 
                is_approved: false
            })}
          />
        </Col>
        <Col>
          {is_approved ? 
            <Tag style={styles.Tag} 
              color='blue' >Aprobado</Tag> : 
            <>
              <Tag style={styles.Tag}  
                color='volcano'>
                  En proceso
              </Tag>
            </>}
        </Col>
      </Row>
      <Row>
        <Col xs={22} lg={8} style={{padding:'30px'}}>
          {state.modules && <NavigateMenuCourse  course={id_module}  modules={state.modules} setState={setState} state={state} />}
                  </Col>
        <Col lg={13} xs={22} >
          {state.modules && 
          <RetrieveVideo promotional_video={state.modules[0].videos[0].url} 
                  file_promotional={state.file_promotional}
                  description={state.promotional_description} 
                  video={state.video} 
                  resources={state.resources} />
          }
          {state.is_last && <> 
            {!is_approved && <>
              {state.questions && 
                <Evaluation questions={state.questions} /> 
              }</>
            }</>
          }
        </Col>
      </Row>
    </>
  )

}

const styles = {
  
  Tag: {
    marginTop:'25px'
  }
  
}

export default DetailModule
