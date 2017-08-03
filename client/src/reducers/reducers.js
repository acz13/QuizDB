// While app is simple, keep everything in one reducer module :)

import { combineReducers } from 'redux';
// responsive state tracker
import { responsiveStateReducer } from 'redux-responsive';

import {
  // search actions
  UPDATE_SEARCH,
  UPDATE_SEARCH_FILTER,
  // questions actions
  SEARCH_QUESTIONS,
  RECEIVE_QUESTIONS
} from '../actions/actions';

const initialSearchState = {
  value: "",
  filters: {}
}
function search(state = initialSearchState, action) {
  switch(action.type) {
    case UPDATE_SEARCH:
      return Object.assign({}, state, {
        value: action.value
      });
    case UPDATE_SEARCH_FILTER:
      return Object.assign({}, state, {
        filters: Object.assign({}, state.filters, {
          [action.filter]: action.values
        })
      })
    default:
      return state;
  }
}

const initialQuestionsState = {
  isFetching: false,
  data: []
}
function questions(state = initialQuestionsState, action) {
  switch (action.type) {
    case SEARCH_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_QUESTIONS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.questions,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}


const quizdb = combineReducers({
  search,
  questions,
  browser: responsiveStateReducer
})

export default quizdb