// Default value for Initial State
const initState = {
  
}

const projectReducer = (state = initState, action) => {
  // Manipulate the state here
  switch (action.type) {
    case 'CREATE_PROJECT':
      console.log('create project', action.docRef.id)
      return {
        ...state,
        projectCreatedId: action.docRef.id
      };
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error', action.err)
      return state;


    case 'EDIT_PROJECT':
      console.log('update project', action.project)
      return {
        ...state,
        projectUpdateTime: new Date()
      };
    case 'EDIT_PROJECT_ERROR':
      console.log('update project error', action.err)
      return state;
      

    case 'DELETE_PROJECT':
      console.log('project deleted')
      return state;
    case 'DELETE_PROJECT_ERROR':
    console.log('project not deleted')
      return state;

    default:
      return state;
  }
}


export default projectReducer