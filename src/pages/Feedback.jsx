import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const NUMBER_BASE = 3;
    return (
      <section>
        <Header />
        {assertions < NUMBER_BASE ? <p data-testid="feedback-text">Could be better...</p>
          : <p data-testid="feedback-text">Well Done!</p> }

      </section>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
