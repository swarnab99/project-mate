import React from 'react'
import NotificationItem from './NotificationItem'
import Loader from '../layout/Loader'
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
        {!notifications && <Loader />}
        <NotificationItem notifications={notifications} />
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
