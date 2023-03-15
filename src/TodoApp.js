import React, { useEffect, useReducer } from 'react'
import { todoReducer } from './reducers/todoReducer'
import { useForm } from './Hooks/useForm'

const init = () => {
  return JSON.parse(localStorage.getItem('todo')) || []
} 

export const TodoApp = () => {

  const [ state, dispatch ] = useReducer(todoReducer, [], init)
  const [ { description }, handleInputChange, reset ] = useForm({
    description:''
  })

  useEffect(() => {
    localStorage.setItem( 'todo', JSON.stringify(state) )
  }, [state])

  const handleDelete = (todoId) => {
    console.log(todoId)

    const action = {
      type: 'delete',
      payload: todoId
    }

    dispatch(action)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(description.trim().length <= 1){
      return
    }

    const newTodo = {
      id: new Date().getTime(),
      desc: description,
      done: false
    }

    const action = {
      type: 'add',
      payload: newTodo
    } 

    dispatch(action)
    reset()
  }

  return (
    <>
      <h1>TodoApp ({ state.length })</h1>
      <hr />

      <div className='row'>
        <div className='col-7'>
          <ul className='list-group list-group-flush col-7'>
            {
              state.map((t, i) => {
                return(
                  <li 
                    key={ t.id } 
                    className='list-group-item'>
                      <p className='text-center'>{ i + 1 } { t.desc }</p>
                      <button onClick={ () => handleDelete(t.id) } className='btn btn-danger'>Borrar</button>
                  </li>
                )
              })
            }
          </ul>
        </div>
        
        <div className='col-5'>
          <h4>Agregar Tarea</h4>
          <hr />
          <form onSubmit={ handleSubmit }>
            <div className="input-group mb-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Agregar tarea" 
                autoComplete='off'
                name='description'
                value={ description }
                onChange={ handleInputChange }
              />
            </div>
            <div className='d-grid'>
              <button type='submit' className='btn btn-outline-primary btn-block'>Agregar Tarea</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
