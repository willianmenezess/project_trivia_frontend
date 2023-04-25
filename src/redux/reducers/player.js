import { ADD_EMAIL, ADD_PLAYER, ADD_SCORE, ADD_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  email: '',
  playerName: '',
  score: 0,
  assertions: 0,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload.email,
    };
  case ADD_PLAYER:
    return {
      ...state,
      playerName: action.payload.player,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload.score,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload.assertions,
    };
  default:
    return state;
  }
};

export default playerReducer;
