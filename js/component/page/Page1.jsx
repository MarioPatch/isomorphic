import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class Page1 extends React.Component {
  render() {
    const {counter} = this.props;
    return (
      <div>
        <h1>Page1</h1>
        <p>Counter: {counter}</p>
      </div>
    )
  }
};

Page1.propTypes = {
  counter : PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
  counter: state.counter,
})

export default connect(mapStateToProps)(Page1);