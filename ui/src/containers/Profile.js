import React, { useContext } from 'react'
import { Typography, Row, Tag, Col, Descriptions, Table, PageHeader, Avatar  } from 'antd'
import { AuthContext  } from '../App'
import { LikeFilled, FormOutlined, DislikeFilled  } from '@ant-design/icons'
const { Title } = Typography 

const Profile = () => {
  

  const {state:auth} = useContext(AuthContext)
  const user = auth.user
  const approved_courses = auth.user.profile.approved_courses
  const columns = [
    {
      title: 'Curso',
      render: (obj) =><>
        {obj.course.title}
      </>
    },
    {
      title: 'Fecha Aprobacion',
      render: (obj)=><>
        <Tag color='blue'>
          {obj.created.slice(0,10)}
        </Tag>
      </>
    },
  ]
  

  return(
    <React.Fragment>
    <div style={styles.container}>
      <Row>
        <Col xs={24}>
          <PageHeader 
            title={`@${user.username}`}
            subTitle={user.email}
          />
        </Col>
      </Row>
      <Row >
    {window.innerWidth > 800 && <Col lg={12} xs={24} style={{paddingLeft:'15%', paddingTop:'5%'}}>
          <Avatar style={styles.avatar} size={200}>
            {user.first_name.slice(0,1)}{user.last_name.slice(0,1)}
          </Avatar> 
        </Col>}
        <Col lg={12} xs={22}>
          <Descriptions bordered layout='vertical'>
            <Descriptions.Item label='Nombre' span={3}>
              {user.first_name} {user.last_name}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>
              {user.email} 
            </Descriptions.Item>
            <Descriptions.Item label='Usuario' span={2}>
              {user.username}
            </Descriptions.Item>
            </Descriptions>
        </Col>
        <Col style={styles.colTable} xs={22} lg={24}>
          <Table title={()=> 'Cursos Completados'} 
            dataSource={approved_courses} 
            columns={columns}
            bordered  
             />
        </Col>
      </Row>
      </div>
    </React.Fragment>
  )

}

const styles = {
  Like: {
    color:'green',
    fontSize:'25px'
  },
  Dislike:{
    color:'red',
    fontSize:'25px'
  },
  descriptionTest: {
    textAlign:'center'
  },
  avatar: {
    backgroundColor: '#10239e',
    fontSize:'120px'
  },
  container: {
    padding:'30px'
  },
  colTable: {
    paddingTop: '20px'
  } 
}


export default Profile
