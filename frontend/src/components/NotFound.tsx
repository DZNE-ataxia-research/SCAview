import Alert from '@material-ui/lab/Alert';
import React from 'react';
import { NavLink } from 'react-router-dom';

interface Props {}

const NotFound: React.FunctionComponent<Props> = props => {
  return (
    <div className="container">
      <Alert severity="error" variant="filled">
        Page not found. Please start again from here:{' '}
        <NavLink
          style={{ color: '#fff' }}
          exact
          to={`${process.env.PUBLIC_URL}/`}
        >
          Home
        </NavLink>
      </Alert>
    </div>
  );
};

export default NotFound;
