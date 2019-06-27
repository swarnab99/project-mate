import React, { useState } from 'react'
import { connect } from 'react-redux'
// Actions using thunk
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'


const CreateProject = (props) => {
  const [projects, setProjects] = useState({
    title: '',
    content: ''
  });


  // METHODS
  const onChange = (e) => {
    setProjects({
      ...projects,
      [e.target.id]: [e.target.value]
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(props)

    props.createProject(projects)
    props.history.push('/');
  }

  if (!props.auth.uid) return <Redirect to='/signin' />

  return (
    <div className="container" style={{marginTop: '60px'}}>
      <form onSubmit={onSubmit} className="white">
        <h5 className="grey-text darken-3" style={{marginBottom: '30px'}}>Create your project</h5>
        <div className="input-field">
          <label htmlFor="title">Title</label>
          <input onChange={onChange} type="text" id="title" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="content">Project Content</label>
          <textarea onChange={onChange} className="materialize-textarea" id="content"></textarea>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Create</button>
        </div>
      </form>      
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)
