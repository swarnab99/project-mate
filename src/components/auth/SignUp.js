import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

const SignUp = ({ signUp, auth, authError }) => {
  const [projects, setProjects] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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
    signUp(projects)
  }

  // *Route Guard
  if(auth.uid) return <Redirect to='/' />

  return (
    <div className="container" style={{marginTop: '60px'}}>
      <form onSubmit={onSubmit} className="white">
        <h5 className="grey-text darken-3" style={{marginBottom: '30px'}}>Sign Up</h5>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input onChange={onChange} type="text" id="firstName" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input onChange={onChange} type="text" id="lastName" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input onChange={onChange} type="email" id="email" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input onChange={onChange} type="password" id="password" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign up</button>
          <div className="red-text center">
            { authError ? <p>{ authError }</p> : null }
          </div>
        </div>
      </form>      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
