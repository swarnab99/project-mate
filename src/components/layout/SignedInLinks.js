import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = ({signOut, profile}) => {
  // console.log(props)
  return (
    <ul className="right">
      <li><NavLink to="/create-project" className="btn-floating btn-large waves-effect waves-light red create-new"><i className="material-icons">add</i></NavLink></li>
      <li><NavLink to='/signin' onClick={signOut}>Log Out</NavLink></li>
      <li><NavLink to="/" className="btn btn-floating pink lighten-1">{ profile.initials }</NavLink></li>
      <li><NavLink to="/notifications"><i className="material-icons">notifications</i></NavLink></li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

// first parameter is null because it is for mapStateToProps
export default connect(null, mapDispatchToProps)(SignedInLinks)
