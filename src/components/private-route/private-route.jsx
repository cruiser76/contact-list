import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = (props) => {
  const {render, path, exact, authorizationStatus, computedMatch, requiredAuthorizationStatus, redirectRoute} = props;
  return (
    <Route
      path={path}
      exact={exact}
      match={computedMatch}

      render={() => {
        return (
          authorizationStatus === requiredAuthorizationStatus
            ? render(computedMatch)
            : <Redirect to={redirectRoute} />
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  pathToRedirect: PropTypes.string,
  computedMatch: PropTypes.object,
  requiredAuthorizationStatus: PropTypes.string.isRequired,
  redirectRoute: PropTypes.string.isRequired
};

export default PrivateRoute;
