import React from 'react';
import { Link } from 'react-router'

class Page404 extends React.Component {
  render() {
    return (
      <div>
          <h1>Page not found</h1>
          <Link to={`/`}>Revenir à la homepage</Link>
      </div>
    )
  }
};

export default Page404