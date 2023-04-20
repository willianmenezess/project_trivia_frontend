// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PLAYER = 'ADD_PLAYER';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email,
  },
});

export const addPlayerName = (player) => ({
  type: ADD_PLAYER,
  payload: {
    player,
  },
});
