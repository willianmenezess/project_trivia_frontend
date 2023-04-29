import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Styles/Header.css';

const styleHeader = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
};

class Header extends Component {
  render() {
    const { playerName, email, score } = this.props;
    const gravatar = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
    return (
      <header style={ styleHeader } className="header-container">
        <img
          className="header-img"
          src={ gravatar }
          alt={ `${playerName} avatar` }
          data-testid="header-profile-picture"
          style={ { width: '50px' } }
        />
        <h3 data-testid="header-player-name" className="header-name">
          {playerName}
        </h3>
        <h4 data-testid="header-score" className="header-score">
          {score}
        </h4>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  playerName: state.player.playerName,
  email: state.player.email,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
