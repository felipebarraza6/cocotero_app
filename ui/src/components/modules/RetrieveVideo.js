import React, { useContext } from 'react'

import { Row, Col, Tooltip, 
        Typography, Button } from 'antd'
import { CloudDownloadOutlined } from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { AuthContext } from '../../App'
const { Title, Paragraph } = Typography

const RetrieveVideo = ({file_promotional,video,resources,promotional_video, description}) => {
  
  const { state } = useContext(AuthContext)
  console.log(promotional_video)
  console.log(video)

  return(<>
      <Row>
        <Col xs={22} lg={24}>
          {video ? <Title>{video.title}</Title>:
                    <>
                      <Title> {window.innerWidth < 800 && <>&nbsp;</> }Bienvenid@  
                        &nbsp;
                        {state.user.first_name.slice(0,1).toUpperCase()}
                        {state.user.first_name.slice(1)} 
                        &nbsp; 
                        {state.user.last_name.slice(0,1).toUpperCase()}
                        {state.user.last_name.slice(1)}
                      </Title>
                      <Paragraph style={{ margin: window.innerWidth > 800 ? '0px': '0px' }}>
                        {description}
                      </Paragraph>
                    </>}
                  </Col>
        <Col xs={22} lg={24} style={{paddingTop: '10px'}}>
          {video ? 
            <ReactPlayer width={window.innerWidth > 800 ? '644ppx':'400px'} controls={true} url={video.url} />:
            
            <>
            <ReactPlayer width={window.innerWidth > 800 ? '644px':'400px'} controls={true} url={promotional_video} />
            {file_promotional && <>
            <Title level={4} style={styles.title_promo}>Recursos generales:</Title>
            <Tooltip title='Descargar recurso'> 
              <Button type='link' onClick={()=>window.open(`${file_promotional}`)}>
                <CloudDownloadOutlined style={styles.icon} />
              </Button>
            </Tooltip></>}
            </>
          }
        </Col>
        <Col span={24}>
          {resources && <>{resources.length > 0 &&   
          <Title level={4} style={styles.title_promo}>Recursos de la clase:</Title>
             }
            {resources.map((x)=><>
              <Button type='link'  onClick={()=> 
                  window.open(`http://localhost:8000${x.file_re}`) }>
              <Tooltip title={x.title.toLowerCase()}>
                <CloudDownloadOutlined style={styles.icon} />
              </Tooltip>
            </Button></>)}
          </>}
        </Col>
      </Row>
    </>)

}


const styles = {
  icon: {
    fontSize:'25px'
  },
  title_promo: {
    marginTop:'20px'
  }
}

export default RetrieveVideo
