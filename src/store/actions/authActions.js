/*  //* INFORMATION 

    dispatch => To dispatch the Action to Reducer
    TODO  getState => 
    getFirebase => To get the auth information
    getFirestore => To store extra information about user (i.e. firstName and lastName)

*/



// *Action for SignIn (Used in SignIn.js)
export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' })
    }).catch(err => {
      dispatch({ type: 'LOGIN_ERROR', err })
    })
  }
}


// *Action for SignOut (Used in LogOut button)
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    })
  }
}


// TODO this is not working

// *Action for SignUp (Used in SignUp.js)
export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) => {
      // *Instead of .add we did .doc to get the auto-id and create new collection with that id for linking user data
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        // *Initial demo: Swarnab Das => SD
        initials: newUser.firstName[0] + newUser.lastName[0]
      })
    }).then(() => {
      dispatch({ type: 'SIGNUP_SUCCESS'})
    }).catch(err => {   // *This will catch both error if occurred
      dispatch({ type: 'SIGNUP_ERROR', err })
    })

  }
}





