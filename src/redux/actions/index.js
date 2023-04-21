import { fetchQuestions } from '../../services/api';

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';

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
