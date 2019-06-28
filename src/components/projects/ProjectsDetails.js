import React, {useState} from 'react'
import Loader from '../layout/Loader'
import EditProject from './EditProject'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import moment from 'moment'




const ProjectsDetails = (props) => {
  // console.log(props)
  // const id = props.match.params.id;

  const [component, setComponent] = useState({
    isEdit: false,
    icon: 'edit'
  })


  const {project, auth, history} = props
  // *Route Gaurd
  if(!auth.uid) return <Redirect to='/signin' />


  const onDelete = () => {
    // *deleteProject() comming from mapDispatchToProps
    props.deleteProject(props.match.params.id)
    history.push('/');
    // console.log(props.match.params.id)
  }

  const onClick = () => {
    if(!component.isEdit)
      setComponent({isEdit: !component.isEdit, icon: 'keyboard_backspace'});
    else
      setComponent({isEdit: !component.isEdit, icon: 'edit'});
  }


  if (project) {
    // console.log(project)
    const {title, content, createdAt, authorFirstName, authorLastName} = project;
    return (
      <div className="container section project-details">
        {(props.auth.uid === project.authorId)? (<button onClick={onClick} className="btn-floating btn-large waves-effect waves-light pink lighten-1 update-btn"><i className="material-icons">{component.icon}</i></button>) : null}
        
        {!component.isEdit ? (
          <div className="card z-depth-0">
          {/* Only Creator can delete their project */}
          {(props.auth.uid === project.authorId) ? (
            <div onClick={onDelete} className="delete-btn"><i className="material-icons">delete</i></div>
          ): null}          
  
            <div className="card-content">
              <span className="card-title">{title}</span>
              <p className="flow-text">{content}</p>
            </div>
            <div className="card-action  grey-text">
              <div>Posted by {authorFirstName} {authorLastName}</div>
              <div>
                <p className="grey-text">{ moment(createdAt.toDate()).calendar() }</p>
                
              </div>
            </div>
          </div>
        ) : (<EditProject project={project} id={props.match.params.id}  />)}
      </div>
    )
  } else {
    return (<Loader />)
  }
 
}


const mapStateToProps = (state, ownProps) => {
  // console.log(state)
  const id = ownProps.match.params.id
  const projects = state.firestore.data.projects
  const project = projects ? projects[id] : null
  return {
    project: project,
    auth: state.firebase.auth
  }
}



const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (projectId) => dispatch(deleteProject(projectId))
  }
}




export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectsDetails)
