import React from 'react';
import {applyMiddleware, compose, createStore, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import projectReducer from './ProjectReducer';

const rootReducer = combineReducers({
  project: projectReducer,
});

const middleware = [thunk];
const composeEnhancers = compose(applyMiddleware(...middleware));

const configureStore = () => {
  return createStore(rootReducer, composeEnhancers);
};

const store = configureStore();

export default store;
