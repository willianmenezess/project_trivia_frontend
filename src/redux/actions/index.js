import { fetchQuestions } from '../../services/api';

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

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

export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: {
    score,
  },
});

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: {
    assertions,
  },
});

const fetchQuestionSucess = (questions) => ({
  type: ADD_QUESTIONS,
  payload: {
    questions,
  },
});

// ACTIONS THUNK
export const fetchQuestionsThunk = () => async (dispatch) => {
  try {
    const data = await fetchQuestions();
    dispatch(fetchQuestionSucess(data.results));
  } catch (error) {
    console.log(error);
  }
};
