import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

/* Firebase config */
const firebaseConfig = {
  apiKey: "AIzaSyBTI-rQGu3PvECS3I6Uflb0tIT5rXcpZ5E",
  authDomain: "cookondemand-95c24.firebaseapp.com",
  databaseURL: "https://cookondemand-95c24.firebaseio.com",
  projectId: "cookondemand-95c24",
  storageBucket: "cookondemand-95c24.appspot.com",
  messagingSenderId: "351355206454",
  appId: "1:351355206454:web:2ac399d69ca380b4"
};

/* react-redux-firebase config */
const rrfConfig = {
  userProfile: "users",
  userFirestoreForProfile: true
};

/* Init firebase instance */
firebase.initializeApp(firebaseConfig);

/* init firestore */
const firestore = firebase.firestore();

/* Add reactReduxFirebase enhancer when making store creator */
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

/* Add firebase to reducers */
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

/* Create initial state */
const initialState = {};

/* Create store */
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
