import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'

const ProjectsDetails = ({project, auth}) => {
  // const id = props.match.params.id;
  // *Route Gaurd
  if(!auth.uid) return <Redirect to='/signin' />

  if (project) {
    // console.log(project)
    const {title, content, createdAt, authorFirstName, authorLastName} = project;
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{title}</span>
            <p>{content}</p>
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
    return (
      <div className="container center">
        <p>Loading Project...</p>
      </div>
    )
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

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectsDetails)
