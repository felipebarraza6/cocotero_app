import React, { useState, useEffect, useContext } from 'react'
import { Tag, Timeline, Skeleton, Row, Col } from 'antd'
import {AuthContext} from '../App'
import api from '../api/endpoints'

const LearningRoute = () => {

  const [modules, setModules] = useState([])
  const [loading, setLoading] = useState(false)
  const { state:auth } = useContext(AuthContext)
  const approved = auth.approved_courses

  useEffect(()=> {
       async function get_modules(){
      
      setLoading(true)

      const request = await api.courses.get_courses().then((response)=> {
        setModules(response.results)
        setLoading(false)
      })
      
    }

    get_modules()

  },[])

  return(
    <>
    {loading ? <Skeleton/ >:
    <Col style={{marginTop:'3%'}}>
    <Timeline
        style={{backgroundColor:'white', padding:'70px', borderRadius:'15px', boxShadow:'10px 10px 10px rgba(0, 0, 0, 0.5)'}}
      >      
      {approved < 1 && <>
        <Timeline.Item color={'red'}>SIN CURSOS APROBADOS...</Timeline.Item>
        </>}
      {approved.map((module)=> {
        var color= 'green'
        var aproved_course  = false
        var date_aprovedd = ''
        var code = ''
        
        return(
          <Timeline.Item 
              color={color}  
              key={module.id}>
                {module.course.title}
                <Tag color='green' style={{marginLeft:'10px'}} >
                  {module.created.slice(0,10)}
                </Tag>
            </Timeline.Item>
        )

      })}
    </Timeline>
    </Col>
    }
    </>
  )

}


export default LearningRoute
