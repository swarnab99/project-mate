/*   

    * This will handle all actions come from authActions
    LOGIN_ERROR => 
    LOGIN_SUCCESS => 
    SIGNOUT_SUCCESS =>
    SIGNUP_SUCCESS =>
    SIGNUP_ERROR =>

*/


// Default value for Initial Stage
const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  // Manipulate the state here
  switch (action.type) {
    case 'LOGIN_ERROR':
      console.log('login error', action.err);
      return {
        ...state,
        authLoginError: action.err.message
      }

    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authLoginError: null
      }

    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;

    case 'SIGNUP_SUCCESS':
      console.log('signup success')
      return {
        ...state,
        authSignupError: null
      }

    case 'SIGNUP_ERROR': 
      console.log('signup error', action.err)
      return {
        ...state,
        authSignupError: action.err.message
      }
    
    default:
      return state;
  }
}


export default authReducer