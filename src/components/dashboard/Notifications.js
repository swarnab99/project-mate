import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'

const Notifications = ({auth, notifications}) => {
  // console.log(notifications)
  // *Route Guard
  if (!auth.uid) return <Redirect to='/signin' />

  return (
    <div className="col s12 m6 notifications">
      <div className="container">
        <ul className="collection with-header">
          { notifications && notifications.map(item => {
            return item.type === 'new_project' ? (
              // When new project is created
              <li className="collection-item avatar z-depth-1"  key={item.id} >
                <i className="material-icons circle green" style={{fontFamily: 'sans-serif'}}>{item.firstName[0] + item.lastName[0]}</i>
                <span className="title">{item.firstName} {item.lastName} created a project - "{item.projectTitle}"</span>
                <p className="text-mute">
                  { moment(item.time.toDate()).startOf('min').fromNow() }
                </p>
              </li>
              
            ) : (
              // When new user is joined
              <li className="collection-item avatar z-depth-1"  key={item.id} >
                <i className="material-icons circle green">insert_chart</i>
                <span className="title">{item.user} joined ProjectMate</span>
                <p className="text-mute">
                  { moment(item.time.toDate()).startOf('min').fromNow() }
                </p>
              </li>
              
            )
          })
          }
        </ul>
      </div>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notifications: state.firestore.ordered.notifications,
    auth: state.firebase.auth
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'notifications', limit: 20, orderBy: ['time', 'desc'] }
  ])
)(Notifications)
