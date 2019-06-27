import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props;
  // console.log(auth)
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignOutLinks />
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          <Link to="/" className="brand-logo left">MarioPlan</Link>
          { links }
        </div>
      </nav>
    </div>
  )
}

// this will give state data to this component via props
const mapStateToProps = (state) => {
  // console.log(state)
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)
