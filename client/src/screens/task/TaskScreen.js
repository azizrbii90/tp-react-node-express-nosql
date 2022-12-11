import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Store } from 'react-notifications-component';
import { createTask, updateTask } from '../../actions/taskActions'

const TaskScreen = () => {

  const [formData, setFormData] = useState({
    title : '',
    description : '',
    finished: false,
    finished_at : null
  })

  const taskReducer = useSelector((state) => state.taskReducer)
  const { tasks, error } = taskReducer

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

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

  useEffect(() => {
    getActualTask()
  }, [id, tasks])

  useEffect(() => {
    getActualTask()
  }, [id, tasks])

  const getActualTask = () => {
    if(id!=="-1") {
        for(const c of tasks) {
            if(c._id == id) {
                setFormData({ title: c.title, description: c.description, finished : c.finished, finished_at: c.finished_at })
                break;
            }
        }
    }
  }

  const handleFormData = input => e => {
    let value = e.target.value
    if (value=='on')
      value = e.target.checked
    if(value=='off')
      value = e.target.checked
    setFormData(prevState => ({
        ...prevState,
        [input]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if(formData.finished) 
      formData.finished_at = new Date()
    else
      formData.finished = null
    if(id=="-1") {
        dispatch(createTask(formData)).then((data) => {
            if (data) {
                Store.addNotification({
                    title: "create success",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                      duration: 2000,
                    }
                })
                setTimeout(() => {
                    navigate("/tasks")
                }, 2000);
                setFormData({ title: "", description: ""})
            }
        })
    } else {        
        dispatch(updateTask(formData)).then((data) => {
            if (data) {
                Store.addNotification({
                    title: "update success",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    dismiss: {
                      duration: 2000,
                    }
                })
                setTimeout(() => {
                    navigate("/tasks")
                }, 2000);
                setFormData({ title: "", description: ""})
            }
        })
    }
  } 

  return (
    <div className="d-flex justify-content-center">
        <form onSubmit={submitHandler} className="w-50">
            <div className="form-group">
                <label className="label-primary">Title</label>
                <input className="form-control" type="text" placeholder="Name" value={formData.title} required
                onChange={handleFormData("title")} />
            </div>
            <div className='form-group'>
                <label className="label">Description</label>
                <textarea className="form-control" type="text" rows="6" style={{ resize: "none" }} placeholder="Description" value={formData.description}
                onChange={handleFormData("description")}></textarea>
            </div>
            <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" checked={formData.finished} 
                            onChange={handleFormData('finished')}/>
                            <label className="form-check-label">Finished</label>
            </div>
  
            <br/>
            <button className="btn btn-secondary btn-block" submit="type">
                {id == '-1' ? (
                    "save"
                ) : (
                    "update"
                )}
            </button>
        </form>
    </div>
  )
}

export default TaskScreen
