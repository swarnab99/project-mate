/*  //* INFORMATION 

    dispatch => To dispatch the Action to Reducer
    getState => Return the State object (i.e. User Profile etc.)
    getFirebase => To get the auth information
    getFirestore => To store extra information about user (i.e. firstName and lastName)

*/


export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
  
    const firestore = getFirestore()
    const profile = getState().firebase.profile
    const authorId = getState().firebase.auth.uid
    // connecting with projects collection on firestore 
    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {

      dispatch({ type: 'CREATE_PROJECT', project });

    }).catch((err) => {

      dispatch({ type: 'CREATE_PROJECT_ERROR', err})
      
    })

  }
};