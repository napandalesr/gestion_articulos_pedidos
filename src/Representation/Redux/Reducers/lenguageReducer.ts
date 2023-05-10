import { types } from '../types';

export const lenguageReducer = (state = {}, action: any): any => {
  switch (action.type) {
    case types.lenguage: {
      const lenguage = action.payload;
      return {
        ...state,
        lenguage
      };
    }
    default:
      return state;
  }
};
