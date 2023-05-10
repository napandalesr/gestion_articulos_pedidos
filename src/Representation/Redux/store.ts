import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { lenguageReducer } from './Reducers/lenguageReducer';

const reducers = combineReducers({
  lenguageReducer
});

export default createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
