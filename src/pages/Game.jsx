import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestionsThunk } from '../redux/actions';
import { fetchQuestions } from '../services/api';
import Questions from '../components/Questions';

class Game extends Component {
  async componentDidMount() {
    const NUMBER_ERROR_CODE = 3;
    const { dispatch, history } = this.props;
    const data = await fetchQuestions();
    if (data.response_code === NUMBER_ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      dispatch(fetchQuestionsThunk());
    }
  }

  render() {
    return (
      <section>
        <h3>Game</h3>
        <Header />
        <Questions />
      </section>
    );
  }
}

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
