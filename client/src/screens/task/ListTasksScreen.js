import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteTask } from '../../actions/taskActions'
import { Store } from 'react-notifications-component';
import moment from 'moment'


const ListTasksScreen = () => {

  const taskReducer = useSelector((state) => state.taskReducer)
  const { tasks, error, loading} = taskReducer
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  useEffect(() => {
    
    if(error) {
            Store.addNotification({
                title: error,
                type: "danger",
                insert: "top",
                container: "top-right",
                dismiss: {
                  duration: 2000,
                }
        })
    }
  }, [error])

  const deleteTaskHandler = (id) => {
    dispatch(deleteTask(id)).then((data) => {
        if (data) {
            Store.addNotification({
                title: "delete success",
                type: "success",
                insert: "top",
                container: "top-right",
                dismiss: {
                  duration: 2000,
                }
            })
        }
    })

  }

  return (
    <div className="">
        <div className="d-flex justify-content-between">
                <h3>List Tasks</h3>
                <button className='btn rounded-circle' onClick={() => {navigate("/tasks/-1")}}>
                    <i className="fa fa-plus fa-2xs"></i>
                </button>
        </div>
        
        <div>
            <br/>
            {tasks.map((category, index) => (
                <div key={index}>
                    <div className="row">
                        <div className="col-10">
                            {category.finished ? (
                                <div>
                                    <h4>
                                        <strike>{category.title}</strike>
                                    </h4>
                                    <small>{moment(category.finished_at).format('L')}</small>
                                </div>
                            ): (
                                <h4>{category.title}</h4>
                            )}
                        </div>
                        <div className="col-2">
                            <button className='btn' onClick={() => {navigate("/tasks/"+category._id)}}>
                                <i className="fa fa-pen fa-2xs"></i>
                            </button>
                            <button className='btn' onClick={() => deleteTaskHandler(category._id)}>
                                <i className="fa fa-trash fa-2xs"></i>
                            </button>
                        </div>
                    </div>
                    <hr></hr>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ListTasksScreen