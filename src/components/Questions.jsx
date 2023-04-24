import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore } from '../redux/actions';

const RANDOM_NUMBER = 0.5;
const correctCollor = '3px solid rgb(6, 240, 15)';
const incorrectCollor = '3px solid red';

class Questions extends Component {
  state = {
    counter: 0,
    answered: false,
    timeRemaining: 30,
    allAnswers: [], // Adiciona um novo estado para armazenar as respostas embaralhadas
    assertions: 0, // numero de acertos
    score: 0, // pontuação
  };

  componentDidMount() {
    this.startTimer();
    this.shuffleAnswers();
  }

  // componentDidUpdate(prevProps) {
  //   // // Verifica se houve uma atualização nas propriedades "questions"(vieram novas 5 perguntas da API, ex: atualizou página)
  // const { currentQuestion } = this.state;
  // const { currentQuestion: prevCurrentQuestion } = prevState;
  // if (prevCurrentQuestion !== currentQuestion) {
  //   // Se houver, embaralha as alternativas da pergunta e coloca no estado para renderizá-las
  //   const allAnswers = this.shuffleAnswers();
  //   this.setState({ allAnswers });
  // }

  //   // Verifica se houve uma atualização nas propriedades "questions"(vieram novas 5 perguntas da API, ex: atualizou página)
  //   const { questions } = this.props;
  //   const { questions: prevQuestions } = prevProps;
  //   if (prevQuestions !== questions) {
  //     // Se houver, embaralha as alternativas da pergunta e coloca no estado para renderizá-las
  //     const allAnswers = this.shuffleAnswers();
  //     this.setState({ allAnswers });
  //   }
  // }

  // função executada antes do componente ser removido da tela
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleAnswerClick({ correct }, currentQuestion) {
    const number = 0;
    const { answered, timeRemaining, assertions } = this.state;
    if (!answered && timeRemaining > number) {
      clearTimeout(this.timer);
      this.setState({ answered: true });

      if (correct) {
        this.setState({ assertions: assertions + 1 });
        this.calculateScore(currentQuestion);
      }
    }
  }

  calculateScore = (currentQuestion) => {
    const { score, timeRemaining } = this.state;
    const { dispatch } = this.props;
    const NUMBER_FIXED = 10;
    const three = 3;
    const two = 2;
    const one = 1;
    let fixValue = 1;
    switch (currentQuestion.difficulty) {
    case 'hard':
      fixValue = three;
      break;
    case 'medium':
      fixValue = two;
      break;
    default:
      fixValue = one;
    }
    const currentScore = NUMBER_FIXED + (timeRemaining * fixValue);
    const newScore = score + currentScore;
    this.setState({ score: newScore });
    dispatch(addScore(newScore));
  };

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
    const { counter } = this.state;
    if (questions.length !== 0) {
      const { correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers } = questions[counter];

      const allAnswers = [
        { answer: correctAnswer, correct: true },
        ...incorrectAnswers.map((answer) => ({ answer, correct: false })),
      ].sort(() => Math.random() - RANDOM_NUMBER);

      this.setState({ allAnswers });
    }
  };

  updateCount = () => {
    const { counter } = this.state;
    this.setState({ counter: counter + 1 });
  };

  render() {
    const { answered, timeRemaining, allAnswers, counter } = this.state;
    const { questions } = this.props;
    if (!questions || questions.length === 0 || allAnswers.length === 0) {
      this.shuffleAnswers();
      return <div>Carregando...</div>;
    }
    const { category, question } = questions[counter];
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
                onClick={ () => this.handleAnswerClick(answerObj, questions[counter]) }
                style={ buttonStyle }
                disabled={ answered || timeRemaining === 0 }
              >
                {answerObj.answer}
              </button>
            );
          })}
        </div>
        <div>
          {answered
          && (
            <button
              data-testid="btn-next"
              onClick={ this.updateCount }
            >
              Next
            </button>
          )}
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

export default connect(mapStateToProps)(Questions);
