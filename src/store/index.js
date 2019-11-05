import React from 'react';
import { createStore, combineReducers, applyMiddleware } from "redux";
import editServiceReducer from '../reducers/editServiceReducer';
import serviceListReducer from '../reducers/serviceListReducer';
import thunk from "redux-thunk";

const redusers = combineReducers({
  editServiceState: editServiceReducer,
  serviceListState: serviceListReducer
})

const store = createStore(redusers, applyMiddleware(thunk));

export default store;


