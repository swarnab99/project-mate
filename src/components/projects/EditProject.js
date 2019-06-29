import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { editProject } from '../../store/actions/projectActions'




const EditProject = (props) => {
  // console.log(props)
  

  const {project, id, setComponent, editProject, projectUpdateTime} = props

  const [projects, setProjects] = useState({
    title: '',
    content: ''
  });

  const [form, setForm] = useState({
    loading: false
  })

  useEffect(() => {
    console.log(form.loading )
    if (form.loading) {
      setComponent({isEdit: false, icon: 'edit'})
    }
    // setForm({loading: false})  // ?Do we need it
  }, [projectUpdateTime])

  useEffect(() => {
    if(project){
      setProjects({
        ...project
      })
      // console.log(project)
    }
    // Run This whenever project value changed
  }, [project])




  const onChange = (e) => {
    setProjects({
      ...projects,
      [e.target.id]: e.target.value
    })
  }
  
  // TODO Loading feature is missing
  
  const onSubmit = (e) => {
    e.preventDefault();
    setForm({loading: true})
    editProject(projects, id)     // Calling projectActions.js
    // console.log(form.loading )
  }



  return (
    <div className=" signIn_form" style={{marginTop: '60px'}}>
      
      { form.loading ? (<div className="progress">
                              <div className="indeterminate"></div>
                            </div>) : null }
      <form  onSubmit={onSubmit} className="white m-0 ">
        <h5 className="grey-text darken-3" style={{marginBottom: '30px'}}>Update Project</h5>
        <div className="input-field">
          <label htmlFor="title active">Title</label>
          <input  disabled={form.loading} value={projects.title} onChange={onChange} type="text" id="title" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="content active">Project Content</label>
          <textarea disabled={form.loading} value={projects.content} onChange={onChange} className="materialize-textarea" id="content"></textarea>
        </div>
        <div className="input-field">
          <button disabled={form.loading} className="btn pink lighten-1 z-depth-0 signIn_btn">Update</button>
        </div>
      </form>      
    </div>
  )
}






const mapDispatchToProps = (dispatch) => {
  return {
    editProject: (project, projectId) => dispatch(editProject(project, projectId))
  }
}









export default connect(null, mapDispatchToProps)(EditProject)
