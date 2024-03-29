import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail, addPlayerName,
  fetchQuestionsThunk, resetPlayer } from '../redux/actions';
import { createToken } from '../services/api';
import './Styles/Login.css';

class Login extends Component {
  state = {
    inputName: '',
    inputEmail: '',
    onDisabled: true,
  };

  handleChange = ({ target }) => {
    const { inputEmail, inputName } = this.state;
    const { name, value } = target;
    this.setState({
      [name]: value,
    });

    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g;
    if (inputName !== '' && inputEmail.match(regex)) {
      this.setState({
        onDisabled: false,
      });
    } else {
      this.setState({
        onDisabled: true,
      });
    }
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { inputEmail, inputName } = this.state;
    dispatch(addEmail(inputEmail));
    dispatch(addPlayerName(inputName));
    dispatch(resetPlayer());
    await createToken();
    dispatch(fetchQuestionsThunk());
    history.push('/game');
  };

  render() {
    const { inputEmail, inputName, onDisabled } = this.state;
    return (
      <form className="form-container">
        <input
          className="input-name"
          data-testid="input-player-name"
          type="text"
          placeholder="nome"
          name="inputName"
          onChange={ this.handleChange }
          value={ inputName }
        />
        <input
          className="input-email"
          data-testid="input-gravatar-email"
          type="email"
          placeholder="Email"
          name="inputEmail"
          value={ inputEmail }
          onChange={ this.handleChange }
        />
        <button
          className={ `btn-play ${onDisabled ? 'disabled' : ''}` }
          data-testid="btn-play"
          type="submit"
          disabled={ onDisabled }
          onClick={ this.handleClick }
        >
          Play
        </button>
        <button
          className="btn-settings"
          data-testid="btn-settings"
          type="button"
          onClick={ () => {
            const { history } = this.props;
            history.push('/settings');
          } }
        >
          Settings
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
