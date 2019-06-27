import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const SignIn = ({signIn, authLoginError, auth}) => {
  const [projects, setProjects] = useState({
    email: '',
    password: '',
    loading: false,
    error: null
  });

  // TODO Manipulate the authLoginError to remove the error on component load

  useEffect(() => {
    // Update the document title using the browser API
    if (authLoginError) {
      setProjects({...projects, loading: false, error: authLoginError})
    }
  }, [authLoginError]);



  // METHODS
  const onChange = (e) => {
    setProjects({...projects, [e.target.id]: e.target.value, error: null })
    // console.log(authLoginError, projects)
  }
  
  const onSubmit = (e) => {
    e.preventDefault();
    setProjects({...projects, loading: true, error: null})
    signIn(projects);
    // console.log(projects)
  }

  // *Route Guard => loggedIn user will redirect to home 
  if(auth.uid) return <Redirect to='/' />

  return (
    <div className="container signIn_form" style={{marginTop: '60px'}}>
    { projects.loading ? (<div className="progress">
                            <div className="indeterminate"></div>
                          </div>) : null }
      <form onSubmit={onSubmit} className="white m-0 ">
        <h5 className="black-text darken-3 center" style={{marginBottom: '60px'}}>Sign In</h5>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input disabled={projects.loading} onChange={onChange} type="email" id="email" required />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input disabled={projects.loading} onChange={onChange} type="password" id="password" required />
        </div>
        <div className="input-field"  style={{marginTop: '60px'}}>
          <div className="red-text center">
            { projects.error ? <p>{projects.error}</p> : null }
          </div>
          <button disabled={projects.loading} className="btn pink lighten-1 z-depth-0 signIn_btn">Sign In</button>
        </div>
      </form>      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    authLoginError: state.auth.authLoginError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
