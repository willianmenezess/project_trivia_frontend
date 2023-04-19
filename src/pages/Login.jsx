import React, { Component } from 'react';

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
        >
          Play
        </button>
      </form>
    );
  }
}

export default Login;
