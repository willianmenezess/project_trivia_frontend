import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './Styles/Feedback.css';

class Feedback extends Component {
  handleReturnInitialPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  handleRankingPage = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const NUMBER_BASE = 3;
    return (
      <section>
        <Header />
        <form className="form-container">
          <div className="form-message">
            {assertions < NUMBER_BASE
              ? <p data-testid="feedback-text">Could be better...</p>
              : <p data-testid="feedback-text">Well Done!</p> }
          </div>
          <p className="form-correct-question">
            Total number of correct questions!
            <p
              data-testid="feedback-total-question"
              className="form-assertions"
            >
              {assertions}

            </p>
            <p className="form-score">
              Total score!
              <p
                data-testid="feedback-total-score"
                className="form-total-score"
              >
                {score}

              </p>
            </p>
          </p>
          <div className="button-container">
            <button
              className="btn-play-again"
              type="button"
              data-testid="btn-play-again"
              onClick={ this.handleReturnInitialPage }
            >
              Play Again
            </button>
            <button
              className="btn-ranking"
              type="button"
              data-testid="btn-ranking"
              onClick={ this.handleRankingPage }
            >
              Ranking
            </button>
          </div>
        </form>
      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
}.isRequired;

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
