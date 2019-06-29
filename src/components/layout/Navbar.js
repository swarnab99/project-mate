import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
// import Logo from '../../projectMate.svg'   //!Use logo

const Navbar = (props) => {
  const { auth, profile } = props;
  // console.log(props)
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignOutLinks />
  return (
    <div className="navbar-fixed">
      <nav className="nav-wrapper">
        <div className="container">
          <Link to="/" className="brand-logo left">ProMate</Link>
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
