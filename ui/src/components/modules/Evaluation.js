import React, { useState, useContext } from 'react'
import { notification, Button, Modal, 
          Alert, Form, Select,
          Row, Col} from 'antd'
import { FormOutlined } from '@ant-design/icons'
import { ModulesContext } from '../../containers/Modules'
import api from '../../api/endpoints'
const { Option } = Select

const Evaluation = ({questions})=> {

  const { dispatch, state:Module } = useContext(ModulesContext)
  var module = Module.module
  
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const ModalForm = ({visible, onCancel}) => {
  
    const [form] = Form.useForm()

    const onOk = () => {
      form.submit()
    }

    return(
      <Modal 
        title={`Ayudanos respondiendo está encuesta - ${module.title}`} 
        style={{top:'30px'}}
        width={'100%'}
        okText='ENVIAR RESPUESTAS'
        onCancel={onCancel}  
        visible={visible}
        confirmLoading={loading}
        onOk={onOk}>
          <Form form={form} layout='vertical' name='questionsForm'>
            {questions.map((question)=> 
            <Form.Item key={question.id} name={question.id} label={question.title} 
              rules={[{required:true, message:'Debes seleccionar una respuesta'}]}>
                <Select placeholder='Selecciona una respuesta...' size='large' listItemHeight={10} listHeight={250}>
                  {question.alternatives.map((alternative)=>
                    <Option key={alternative.id} value={alternative.id}  >                       
                        {alternative.title}                                                
                    </Option>
                  )}
                </Select>
            </Form.Item>
            
            )}
          </Form>
      </Modal>
    )
  }
  
  const onCancel = () => {
    setVisible(false)
  }

  const showModal = () => {
    setVisible(true)
  }

  return(
    <Form.Provider 
      onFormFinish={(name, {values})=> {
        setLoading(true)
        var answers = []

        for(const [key, value] of Object.entries(values)){
          answers.push({'question':key, 'answer':value})
        }

        const request = api.courses.finish_course(module.id, answers).then((response)=> {
            dispatch({
              type:'SET_VIEW',
              is_retrieve: false 
            })
            notification.success({
              message: 'Gracias por responder la encuesta',
              description: `${module.title}`
            })
            setLoading(false)
        }).catch((error)=> {
          console.log(error)
          notification.warning({
            message: 'Reprobado',
            description: 'Puedes volver a intentarlo'
          })
          setLoading(false)
        })

        return request


      }}
    >
      <Row align='center'>
      <Button style={styles.Button}  
        type='primary' 
        onClick={showModal}>
          <FormOutlined /> 
          Contestar Encuesta
      </Button>
      <Button style={styles.Button} type='primary' danger 
        onClick={()=> {
          const rq = api.courses.finish_only(module.id).then((r)=> {
            dispatch({
              type:'SET_VIEW',
              is_retrieve: false 
            })
            notification.success({
              message: 'Curso Completado :)',
              description: `${module.title}`
            })
            setLoading(false)
 
          })
        }}>Finalizar Curso</Button>
      </Row>
      <ModalForm visible={visible} onCancel={onCancel}/>
    </Form.Provider>
  )

}

const styles = {
  Button: {
    width:'30%',
    margin:'5px'
  }
}


export default Evaluation
