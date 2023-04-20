import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Questions extends Component {
  // state = {
  //   category: '',
  //   question: [],

  // };

  render() {
    const { questions } = this.props;
    // const { category, question } = this.state;
    return (
      <section>
        <div>Questions</div>
        <section>
          <p data-testid="question-category">{questions.category}</p>
          <p data-testid="question-text">{questions.question}</p>
        </section>
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.questions.questions,
});

Questions.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // history: PropTypes.shape({
  //   push: PropTypes.func.isRequired,
  // }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default connect(mapStateToProps)(Questions);
