import React, {useReducer}  from 'react'
import { PageHeader } from 'antd'
import { Row, Col } from 'react-flexbox-grid'
import ListModules from '../components/modules/ListModules'
import { modules_reducer } from '../reducers/modules'
import DetailModule from '../components/modules/DetailModule'
export const ModulesContext = React.createContext()

const Modules = ({ is_free }) => {
  
  const initialState = {
    is_retrieve: false,
    module: null,
    id_module: null,
    is_approved: false
  }
  
  const [state, dispatch] = useReducer(modules_reducer, initialState)


  return(
    <>
    <ModulesContext.Provider value={{state, dispatch}}>
        {state.is_retrieve ? 
            <DetailModule /> : 
            <ListModules is_free={is_free} />}           
    </ModulesContext.Provider>
    </>
  )

}




export default Modules
