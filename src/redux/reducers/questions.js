import { ADD_QUESTIONS } from '../actions';

const INITIAL_STATE = {
  questions: [],
  difficulty: '',
  category: '',
  timeLeft: 30,
  answered: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_QUESTIONS:
    return {
      ...state,
      questions: [...action.payload.questions],
    };
  default:
    return state;
  }
};

export default questionsReducer;
