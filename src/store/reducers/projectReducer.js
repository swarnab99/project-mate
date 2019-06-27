// Default value for Initial State
const initState = {
  projects: [
    {id: '1', title: 'Help me find peach', content: 'how can I find the peach please help me to find my peach and those who help me I will give him a solid chocolate'},
    {id: '2', title: 'Find Out onether Peach', content: 'how can I find the peach please help me to find my peach and those who help me I will give him a solid chocolate'},
    {id: '3', title: 'Finnaly we did it', content: 'how can I find the peach please help me to find my peach and those who help me I will give him a solid chocolate'},
  ]
}

const projectReducer = (state = initState, action) => {
  // Manipulate the state here
  switch (action.type) {
    case 'CREATE_PROJECT':
      // console.log('create project', action.project)
      return state;
    case 'CREATE_PROJECT_ERROR':
      // console.log('create project error', action.err)
      return state;
    default:
      return state;
  }
}


export default projectReducer