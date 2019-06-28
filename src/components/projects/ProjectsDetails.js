import React from 'react'
import Loader from '../layout/Loader'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { deleteProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import moment from 'moment'




const ProjectsDetails = (props) => {
  // console.log(props)
  // const id = props.match.params.id;
  const {project, auth, history} = props
  // *Route Gaurd
  if(!auth.uid) return <Redirect to='/signin' />


  const onDelete = () => {
    // *deleteProject() comming from mapDispatchToProps
    props.deleteProject(props.match.params.id)
    history.push('/');
    // console.log(props.match.params.id)
  }


  if (project) {
    // console.log(project)
    const {title, content, createdAt, authorFirstName, authorLastName} = project;
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">

          <div onClick={onDelete} className="delete-btn"><i className="material-icons">delete</i></div>

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
