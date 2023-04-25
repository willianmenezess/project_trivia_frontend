import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addScore, addAssertions } from '../redux/actions';

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

  componentDidUpdate(prevProps) {
    // Verifica se houve uma atualização nas propriedades "questions"(vieram novas 5 perguntas da API, ex: atualizou página)
    const { questions } = this.props;
    const { questions: prevQuestions } = prevProps;
    if (prevQuestions !== questions) {
      // Se houver, embaralha as alternativas da pergunta e coloca no estado para renderizá-las
      this.shuffleAnswers();
    }
  }

  // função executada antes do componente ser removido da tela
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  handleAnswerClick({ correct }, currentQuestion) {
    const number = 0;
    const { answered, timeRemaining, assertions } = this.state;
    const { dispatch } = this.props;
    if (!answered && timeRemaining > number) {
      clearTimeout(this.timer);
      this.setState({ answered: true });

      if (correct) {
        const newAssertions = assertions + 1;
        this.setState({ assertions: newAssertions });
        this.calculateScore(currentQuestion);
        dispatch(addAssertions(newAssertions));
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

  saveRankingData = () => {
    const { playerName, score } = this.props;
    const rankingData = localStorage.getItem('ranking');

    const playerData = {
      name: playerName,
      score,
    };

    if (rankingData) {
      const ranking = JSON.parse(rankingData);
      ranking.push(playerData);
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerData]));
    }
  };

  updateCount = () => {
    const { history } = this.props;
    const { counter } = this.state;
    const maxCounter = 4;
    if (counter < maxCounter) {
      this.setState({ counter: counter + 1 }, () => {
        this.shuffleAnswers();
      });
      this.setState({ answered: false, timeRemaining: 30 });
      this.startTimer();
    } else {
      this.saveRankingData();
      history.push('/feedback');
    }
  };

  render() {
    const { answered, timeRemaining, allAnswers, counter } = this.state;
    const { questions } = this.props;
    if (!questions || questions.length === 0) {
      return <div>Loading...</div>;
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
          Time Remaining:
          {' '}
          {timeRemaining}
          {' '}
          seconds
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
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  playerName: state.player.playerName,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Questions);
