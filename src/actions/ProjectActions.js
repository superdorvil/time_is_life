import {SET_PROJECT} from './types';

export const setProject = project => {
  return {
    type: SET_PROJECT,
    payload: project,
  }
};
