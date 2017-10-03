import React from 'react';
import { Link } from 'react-router'

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/`}><img src="img/logo.jpg" width="50"/></Link>
        {this.props.children}
      </div>
    )
  }
};

export default Layout