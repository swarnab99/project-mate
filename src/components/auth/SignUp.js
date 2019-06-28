import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

const SignUp = ({ signUp, auth, authSignupError }) => {
  const [projects, setProjects] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    loading: false,
    error: null
  });

  
  // TODO Manipulate the authSignUpError to remove the previous error on component load

  useEffect(() => {
    setProjects({error: null})
    // Update the document title using the browser API
    if (authSignupError) {
      setProjects({...projects, loading: false, error: authSignupError})
    }
    // eslint-disable-next-line
  }, [authSignupError]);


  // METHODS
  const onChange = (e) => {
    setProjects({...projects, [e.target.id]: e.target.value, error: null })
    // console.log(authSignupError, projects)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    setProjects({...projects, loading: true, error: null})
    signUp(projects);
    // console.log(projects)
  }

  // *Route Guard
  if(auth.uid) return <Redirect to='/' />

  return (
    <div className="container signUp_form" style={{marginTop: '60px'}}>
    { projects.loading ? (<div className="progress">
                            <div className="indeterminate"></div>
                          </div>) : null }
      <form onSubmit={onSubmit} className="white m-0 "  autoComplete="off">
        <h5 className="black-text darken-3 center" style={{marginBottom: '60px'}}>Sign Up</h5>
        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input disabled={projects.loading} onChange={onChange} type="text" id="firstName" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input disabled={projects.loading} onChange={onChange} type="text" id="lastName" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input disabled={projects.loading} onChange={onChange} type="email" id="email" required autoComplete="off"/>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input disabled={projects.loading} onChange={onChange} type="password" id="password" required autoComplete="off"/>
        </div>
        <div className="input-field"  style={{marginTop: '60px'}}>
          <div className="red-text center">
            { projects.error ? <p>{projects.error}</p> : null }
          </div>
          <button disabled={projects.loading} className="btn pink lighten-1 z-depth-0 signUp_btn">Sign up</button>
        </div>
      </form>      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authSignupError: state.auth.authSignupError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
