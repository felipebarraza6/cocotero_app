import React, { useContext, useEffect, useState } from 'react'
import { Row, Col, Table, Tag, Statistic } from 'antd'
import {AuthContext} from '../App'
import { ReconciliationOutlined  } from '@ant-design/icons'
import api from "../api/endpoints"

const ClassesHeld = () => {
  
  const { state:user } = useContext(AuthContext)
  const [approved_courses, setAproved] = useState([]) 
  
  const getData = async () => {
    
    const rq = await api.viewsVideo.last_view_video().then((x)=> {
      setAproved(x.results)
    })
    console.log(approved_courses)

  }

  useEffect(()=> {

    getData()

  },[])

  const columns = [
    {
      title: 'Clase',
      render: (module)=> <Tag style={{fontSize:'13px', padding:'3px'}} color='blue'>{module.video.title}</Tag>
    },
    {
      title: 'Fecha',
      render: (module)=> <Tag color='magenta' style={{fontSize:'13px'}}>{module.created.slice(0,10)} - {module.created.slice(11,19)}</Tag>
    },
    {
      title: 'Curso',
      render: (module)=> <Tag style={{fontSize:'13px', padding:'3px'}} color='purple'>{module.course.title}</Tag>
    }
  ] 

    return(
    <Row style={styles.container}>
      <Col span={24}>
      <Table title={()=> 'CLASES REALIZADAS'} columns={columns} dataSource={approved_courses} />
      </Col>
    </Row>
  )

}

const styles = {
  
  container: {
    padding:'30px'
  }

}


export default ClassesHeld
