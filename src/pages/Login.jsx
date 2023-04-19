import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import createToken from '../services/api';

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
    const { inputEmail } = this.state;
    dispatch(addEmail(inputEmail));
    await createToken();
    history.push('/game');
  };

  render() {
    const { inputEmail, inputName, onDisabled } = this.state;
    return (
      <form>
        <input
          data-testid="input-player-name"
          type="text"
          placeholder="nome"
          name="inputName"
          onChange={ this.handleChange }
          value={ inputName }
        />
        <input
          data-testid="input-gravatar-email"
          type="text"
          placeholder="Email"
          name="inputEmail"
          value={ inputEmail }
          onChange={ this.handleChange }
        />
        <button
          data-testid="btn-play"
          type="submit"
          disabled={ onDisabled }
          onClick={ this.handleClick }
        >
          Play
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
