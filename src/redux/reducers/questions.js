const INITIAL_STATE = {
  questions: [],
  difficulty: '',
  category: '',
  timeLeft: 30,
  answered: false,
};

const questionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default questionsReducer;
