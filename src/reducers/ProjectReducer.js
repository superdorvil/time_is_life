import {SET_PROJECT} from '_actions';

const INITIAL_STATE = {
  id: 0,
};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROJECT:
      return {
        ...state,
        id: action.payload,
      }
    default:
      return state;
  }
};

export default projectReducer;
