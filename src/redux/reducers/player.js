import { ADD_EMAIL, ADD_PLAYER } from '../actions';

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
  default:
    return state;
  }
};

export default playerReducer;
