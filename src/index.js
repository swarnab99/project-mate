import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// For Redux
import { createStore, applyMiddleware, compose } from 'redux'
// Core Reducer which contains multiple Reducer
import rootReducer from './store/reducers/rootReducer'
// This is required to wrap up the components so component can access the store
import { Provider } from 'react-redux'
// Thunk (Middleware)
import thunk from 'redux-thunk'

import { reduxFirestore, getFirestore } from 'redux-firestore'
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import fbConfig from './config/fbConfig'


// Creating the Store (State) and passing all the Reducers vie rootReducer
const store = createStore(rootReducer, 
  compose( 
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    // Gives us firebase details and sync with redux, attachAuthIsReady is to delay dom rendering untill firebase auth is done 
    reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true})
  )
);


// Render the dom after checking the firebase auth
store.firebaseAuthIsReady.then(() => {

  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();

})


