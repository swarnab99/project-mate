import React, { useState } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const SignIn = ({signIn, authError, auth}) => {
  const [projects, setProjects] = useState({
    email: '',
    password: ''
  });


  // METHODS
  const onChange = (e) => {
    setProjects({
      ...projects,
      [e.target.id]: e.target.value
    })
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(projects)
    signIn(projects);
  }


  if(auth.uid) return <Redirect to='/' />

  return (
    <div className="container" style={{marginTop: '60px'}}>
      <form onSubmit={onSubmit} className="white">
        <h5 className="grey-text darken-3" style={{marginBottom: '30px'}}>Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input onChange={onChange} type="email" id="email" />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input onChange={onChange} type="password" id="password" />
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">LogIn</button>
          <div className="red-text center">
            { authError ? <p>{authError}</p> : null }
          </div>
        </div>
      </form>      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
