import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  handleLoginPage = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleLoginPage }
        >
          Voltar ao Login

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
