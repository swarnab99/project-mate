import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
// Actions using thunk
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'


const CreateProject = (props) => {
  // console.log(props)
  const { createProject, history, auth, projectCreatedId } = props
  const [projects, setProjects] = useState({
    title: '',
    content: ''
  });

  const [form, setForm] = useState({
    loading: false
  })

  useEffect(() => {
    if(form.loading) {
      history.push(`/project/${projectCreatedId}`)
    }
  }, [projectCreatedId])


  const onChange = (e) => {
    setProjects({
      ...projects,
      [e.target.id]: e.target.value
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    // TODO
    setForm({loading: true})

    // *createProject() comming from mapDispatchToProps
    createProject(projects)
    
    // console.log(props)
  }

  if (!auth.uid) return <Redirect to='/signin' />

  return (
    <div className="container signIn_form" style={{marginTop: '60px'}}>
      { form.loading ? (<div className="progress">
                              <div className="indeterminate"></div>
                            </div>) : null }
      <form  onSubmit={onSubmit} className="white m-0 ">
        <h5 className="grey-text darken-3" style={{marginBottom: '30px'}}>Create your project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input  disabled={form.loading} value={projects.title} onChange={onChange} type="text" id="title" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea disabled={form.loading} value={projects.content} onChange={onChange} className="materialize-textarea" id="content"></textarea>
        </div>
        <div className="input-field">
          <button disabled={form.loading} className="btn pink lighten-1 z-depth-0 signIn_btn">Create</button>
        </div>
      </form>      
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    projectCreatedId : state.project.projectCreatedId 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
