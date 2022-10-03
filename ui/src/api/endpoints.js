import { POST_LOGIN, GET, POST, UPDATE} from './config'


const get_courses = async() => {
  const request = await GET(`courses/?is_free=true`)
  return request.data
}

const get_courses_authorized = async() => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  const request = await GET(`courses/?is_free=false&authorized_user=${user.id}`)
  return request.data
}

const create_view_video = async(data) => {
  const user = JSON.parse(localStorage.getItem('user') || null) 
  const request = await POST('view_video/', {...data, user:user.id})
  return request.data
}

const list_view_video = async({course}) => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  const request = await GET(`view_video/?user=${user.id}&course=${course}`)
  return request.data
}

const last_view_video = async() => {
  const user = JSON.parse(localStorage.getItem('user') || null)
  const request = await GET(`view_video/?user=${user.id}`)
  return request.data
}

const finish_course = async(course, answers) => {
  const request = await POST(`courses/${course}/finish/`, {'answers': answers})
  return request.data

}

const finish_only = async(course) => {
  const request = await POST(`courses/${course}/finish_only/`)
  return request.data

}

const get_retrieve_course = async(id) => {
  const request = await GET(`courses/${id}/`)
  return request.data

}

const send_initial_test = async(data) => {
  const request = await POST('tests/1/finish_test/', {'answers': data})
  return request.data
}

const get_blogs = async(data) => {
  const request = await GET('blogs/')
  return request
}

const create_comment = async(data) => {
  const request = await POST('comments/', data)
  return request
}

const get_initial_test = async() => {
  const request = await GET('tests/1/')
  return request.data
}

const update_course = async(id, data) => {
  const request = await UPDATE(`courses/${id}/`, data)
  return request
}

const get_profile = async(user)=> {
  const request = await GET(`users/${user}/`)
  return request.data
}

const login = async (data) => {
  
  const request = await POST_LOGIN('users/login/', {
        email: data.email,
        password: data.password
    })

    return request.data
}

const signup = async(data)=> {
  const request = await POST_LOGIN('users/signup/', {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        dni: data.rut,
        username: data.username,
        password: data.password,
        password_confirmation: data.password_confirmation
    })

    return request.data

}

const api = {
  user: {
    login,
    signup,
    get_initial_test,
    get_profile,
    send_initial_test
  },
  courses: {
    get_courses,
    finish_course,
    finish_only,
    get_retrieve_course,
    update_course,
    get_courses_authorized
  },
  viewsVideo: {
    create_view_video,
    list_view_video,
    last_view_video
  },
  blogs: {
    get_blogs,
    create_comment
  }

}

export default api
