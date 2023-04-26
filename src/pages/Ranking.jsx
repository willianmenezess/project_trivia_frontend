import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import './Styles/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    this.setState({ ranking: sortedRanking });
  }

  handleLoginPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;

    return (
      <div className="form-container">
        <h2 data-testid="ranking-title" className="form-title">Ranking</h2>
        <ol className="list-container">
          {ranking.map((player, index) => (
            <li key={ index }>
              <img
                className="player-avatar"
                src={ `https://www.gravatar.com/avatar/${md5(player.gravatarEmail).toString()}` }
                alt={ `${player.name} avatar` }
                style={ { width: '50px' } }
              />
              <span
                data-testid={ `player-name-${index}` }
                className="player-name"
              >
                {player.name}

              </span>
              <span>- Score:</span>
              <span
                data-testid={ `player-score-${index}` }
                className="player-score"
              >
                {player.score}

              </span>
            </li>
          ))}
        </ol>
        <button
          className="btn-go-home"
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleLoginPage }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
