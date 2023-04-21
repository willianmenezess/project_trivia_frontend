import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RANDOM_NUMBER = 0.5;

class Questions extends Component {
  render() {
    const { questions } = this.props;
    const currentQuestion = questions[0];

    if (!questions || questions.length === 0) {
      return <div>Carregando...</div>;
    }

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = currentQuestion;

    const allAnswers = [
      { answer: correctAnswer, correct: true },
      ...incorrectAnswers.map((answer) => ({ answer, correct: false })),
    ].sort(() => Math.random() - RANDOM_NUMBER);

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {allAnswers.map((answerObj, index) => {
            const questionResult = answerObj.correct
              ? 'correct-answer'
              : `wrong-answer-${index}`;

            return (
              <button key={ index } data-testid={ questionResult }>
                {answerObj.answer}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string,
      question: PropTypes.string,
      correct_answer: PropTypes.string,
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    }),
  ).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Questions);
