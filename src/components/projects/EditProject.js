import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import { editProject } from '../../store/actions/projectActions'




const EditProject = (props) => {
  console.log(props)
  

  const {project, id, editProject} = props

  const [projects, setProjects] = useState({
    title: '',
    content: ''
  });

  const [form, setForm] = useState({
    loading: false
  })

  useEffect(() => {
    if(project){
      setProjects({
        ...project
      })
      // console.log(project)
    }
  }, [project])




  const onChange = (e) => {
    setProjects({
      ...projects,
      [e.target.id]: e.target.value
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    
    editProject(projects, id)
    console.log(projects)
  }



  return (
    <div className=" signIn_form" style={{marginTop: '60px'}}>
      
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
