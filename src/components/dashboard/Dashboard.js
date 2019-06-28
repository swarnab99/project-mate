import React from 'react'
import ProjectList from '../projects/ProjectList'
import Loader from '../layout/Loader'
// This will connect redux with react
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'



const Dashboard = ({ projects, auth }) => {
  // console.log(projects)
  // *Route Guard
  if (!auth.uid) return <Redirect to='/signin' />


  // const homeData = projects ? (<ProjectList projects={projects} />) : (<Loader />);

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6 p-0">
          {/* {homeData} */}
          {!projects && <Loader />}
          <ProjectList projects={projects} />
        </div>
      </div>
    </div>
  )
}

// Passing the State through props
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy: ['createdAt', 'desc'] }
  ])
)(Dashboard)
