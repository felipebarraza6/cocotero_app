import React from 'react'

import { Form, Input, Button, Checkbox, Spin, message, notification } from 'antd';

import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { AuthContext } from '../App'
import { validate, clean, format, getCheckDigit} from 'rut.js'
import logo from '../assets/img/white.png'

import '../assets/css/login.css'

import api from '../api/endpoints'


const SignUp = () => {   
    const { dispatch } = React.useContext(AuthContext)
    const [form] = Form.useForm();
    const [statusRut, setStatusRut] = React.useState(false)
    const [errors, setErrors] = React.useState(null)
    const [isPassport, setIsPassport] = React.useState(false)
    const initialState = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",        
        password_confirmation: "",
        isSubmitting: false,
        errorMessage: null,
        user:null,
        createUser: true
    }

    const [data, setData] = React.useState(initialState)
    

    const handleInputChange = e => {        
      if(e.target.name==='rut'){
          console.log()
      }
        setData({
            ...data,
            [e.target.name]: e.target.value            
        })        
    }
    
    const handleFormSubmit = async(formData) => {        
        
        if(data.createUser){
          formData = {
            ...formData,
            'username':formData.username.toLowerCase()
          }
          var passwd = formData.password
          var passwd_val = formData.password_confirmation
          
          if (passwd !== passwd_val){
            message.warning('Las contraseñas no coinciden!')
          }else {
            
            setData({
              ...data,
              isSubmitting:true,
              errorMessage:null
            })
              const request = await api.user.signup(formData).then((response=>{
              setData({
                ...data,
                isSubmitting: false,
                errorMessage: null,
                createUser: false
              })
              message.info(`Usuario creado: ${response.email}`)

            window.location.assign('/')

            })).catch((error)=> {
              var errors = error.response.data
              setData({
                ...data,
                isSubmitting:false,
                errorMessage: error.response.data,                
              })


                Object.keys(errors).map((key, index)=> {                  
                    let field = key
                    let message = errors[key]
                  if(key==='non_field_errors'){
                    field='Error'
                  }
                    notification.error({message:`${field}: ${message}`})
                })
              

              

              message.error('Error al crear usuario!')
            })
            return request

          }
        }else{
          setData({
            ...data,
            isSubmitting:true
          })
          const request = await api.user.login(formData).then((response)=>{
            setData({
              isSubmitting:false,
              errorMessage:null,
              createUser:false
            })
            dispatch({
              type: 'LOGIN',
              payload: response
            })
          }).catch((error)=>{
            message.warning('Error al iniciar sesion')
            setData({
              ...data,
              isSubmitting:false
            })
          })
          return request
         
        }
        }
        
   return(
        <div className="general-login">
          <div className="login-container">
            <img src={logo} style={{width:'100%'}} alt='logo' />
            <div className="login">
                <center><h3 style={{margin:'20px'}}>REGISTRATE Y ACCEDE AL CURSO GRATIS</h3></center>
              <Form
                onFinish = { handleFormSubmit }
                name="normal_login"
                className="login-form"       
                layout='vertical'         
              >
                <Form.Item
                  name="email"
                  rules={[{ required: true, message: 'Ingresa tu correo corporativo', type: 'email', message: 'Seguro que es un correo?'}]}
                >
                  <Input 
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    type="email" 
                    placeholder="Email" 
                    value={data.email}
                    name="email"                    
                    onChange={handleInputChange}                                       
                  />
                </Form.Item>
                  <>
                  <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Ingresa tu nombre de usuaio'}]}
                  >
                    <Input 
                      type='text'
                      placeholder='Usuario'
                      value={data.username}
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='first_name'
                    rules={[{ required: true, message: 'Ingresa tu nombre'}]}
                  >
                    <Input
                      type='text'
                      placeholder='Nombre'
                      value={data.first_name}
                      name='first_name'
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name='last_name'
                    rules={[{ required: true, message: 'Ingresa tu apellido'}]}
                  >
                    <Input 
                      type='text'
                      placeholder='Apellido'
                      name='last_name'
                      onChange={handleInputChange}
                    />
                  </Form.Item>
                 
                                     
                                    
                  </>
                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Ingresa tu contraseña!' },
                    { min:8, message: 'Tu contraseña debe tener al menos 8 caracteres.' },
                    { max:16, message: 'Tu contraseña no debe tener más de 16 caracteres.' }
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Contraseña"
                    value={data.password}
                    name="password"                    
                    onChange={handleInputChange}

                  />
                </Form.Item>
                  <Form.Item
                    name="password_confirmation"
                    rules={[
                      { required: true, message: 'Ingresa tu contraseña de confirmacion!' },
                      { min:8, message: 'Tu contraseña debe tener al menos 8 caracteres.' },
                      { max:16, message: 'Tu contraseña no debe tener más de 16 caracteres.' }
                    ]}
                  >
                    <Input
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      type="password"
                      placeholder="Confirmacion de contraseña"
                      value={data.password_confirmation}
                      name="passord_confirmation"
                      onChange = {handleInputChange}
                    />
                  </Form.Item>
                <Form.Item>
                  {data.isSubmitting ? <Spin />
                    : <Button type="primary" htmlType="submit" className="login-form-button">{data.createUser ? 'Crear':'Ingresar'}</Button>}
                  <Button type='ghost' style={{marginLeft:'10px'}} htmlType="submit" className="login-form-button"><a href='https://startupcomedy.org'>Volver</a></Button>
                </Form.Item>
                              </Form>
            </div>
              <p style={{color:'white'}}>2022 - Startup Comedy</p>
          </div>
        </div>
    )
}


export default SignUp
