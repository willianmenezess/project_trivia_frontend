import React, { Component } from 'react';
import Header from '../components/Header';

class FeedBack extends Component {
  render() {
    return (
      <section>
        <Header />
        <div data-testid="feedback-text">FeedBack</div>
      </section>
    );
  }
}

export default FeedBack;
