import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const RANDOM_NUMBER = 0.5;
const correctCollor = '3px solid rgb(6, 240, 15)';
const incorrectCollor = '3px solid red';

class Questions extends Component {
  state = {
    answered: false,
    timeRemaining: 30,
    allAnswers: [], // Adiciona um novo estado para armazenar as respostas embaralhadas
  };

  componentDidMount() {
    this.startTimer();
    const allAnswers = this.shuffleAnswers();
    this.setState({ allAnswers });
  }

  componentDidUpdate(prevProps) {
    // Verifica se houve uma atualização nas propriedades "questions"
    const { questions } = this.props;
    const { questions: prevQuestions } = prevProps;
    if (prevQuestions !== questions) {
      // Se houver, busca e atualiza as novas respostas
      const allAnswers = this.shuffleAnswers();
      this.setState({ allAnswers });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleAnswerClick() {
    const number = 25;
    const { answered, timeRemaining } = this.state;
    if (!answered && timeRemaining > number) {
      clearTimeout(this.timer);
      this.setState({ answered: true });
    }
  }

  startTimer = () => {
    const number = 1000;
    this.timer = setTimeout(() => {
      const { timeRemaining } = this.state;
      if (timeRemaining > 0) {
        this.setState({ timeRemaining: timeRemaining - 1 });
        this.startTimer();
      } else {
        this.setState({ answered: true });
      }
    }, number);
  };

  shuffleAnswers = () => {
    const { questions } = this.props;
    const currentQuestion = questions[0];

    if (currentQuestion) {
      const { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } = currentQuestion;

      const allAnswers = [
        { answer: correctAnswer, correct: true },
        ...incorrectAnswers.map((answer) => ({ answer, correct: false })),
      ].sort(() => Math.random() - RANDOM_NUMBER);

      return allAnswers;
    }

    return [];
  };

  render() {
    const { answered, timeRemaining, allAnswers } = this.state;
    const { questions } = this.props;

    if (!questions || questions.length === 0) {
      return <div>Carregando...</div>;
    }

    const currentQuestion = questions[0];

    const { category, question } = currentQuestion;

    return (
      <div>
        <p data-testid="question-category">{category}</p>
        <p data-testid="question-text">{question}</p>
        <div data-testid="answer-options">
          {allAnswers.map((answerObj, index) => {
            const questionResult = answerObj.correct
              ? 'correct-answer' : `wrong-answer-${index}`;

            const buttonStyle = answered ? { border: answerObj.correct
              ? correctCollor : incorrectCollor } : {};

            return (
              <button
                key={ index }
                data-testid={ questionResult }
                onClick={ () => this.handleAnswerClick(answerObj) }
                style={ buttonStyle }
                disabled={ answered || timeRemaining === 0 }
              >
                {answerObj.answer}
              </button
              >
            );
          })}
        </div>
        <p>
          Tempo restante:
          {' '}
          {timeRemaining}
          {' '}
          segundos
        </p>
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
