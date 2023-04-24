import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { fetchQuestions } from '../services/api';
import Questions from '../components/Questions';

class Game extends Component {
  async componentDidMount() {
    const NUMBER_ERROR_CODE = 3;
    const { history } = this.props;
    const data = await fetchQuestions();
    if (data.response_code === NUMBER_ERROR_CODE) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  render() {
    const { history } = this.props;
    return (
      <section>
        <h3>Game</h3>
        <Header />
        <Questions history={ history } />
      </section>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Game);
