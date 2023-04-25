import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

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
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <ol>
          {ranking.map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${md5(player.email).toString()}` }
                alt={ `${player.name} avatar` }
                style={ { width: '50px' } }
              />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </li>
          ))}
        </ol>
        <button
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
