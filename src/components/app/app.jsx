import React from 'react';
import {Switch, Router} from 'react-router-dom';
import PrivateRoute from './../private-route/private-route.jsx';
import {connect} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import ContactPage from '../contacts-page/contacts-page.jsx';
import LoginPage from '../login-page/login-page.jsx';
import {Operation, ActionCreator} from './../../redux/reducer.js';
import {AuthorizationStatus} from './../../const.js';
import history from './../../history.js';

const App = (props) => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute
          exact
          path={`/`}
          requiredAuthorizationStatus={AuthorizationStatus.AUTH}
          redirectRoute={`/login`}
          {...props}
          render={(match) => {
            return <ContactPage match={match} {...props}/>;
          }}
        />
        <PrivateRoute
          exact
          path={`/login`}
          requiredAuthorizationStatus={AuthorizationStatus.NO_AUTH}
          {...props}
          redirectRoute={`/`}
          render={() => {
            return <LoginPage
              {...props}
            />;
          }}
        />
      </Switch>
    </Router>

  );
};

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts.filter((contact) => {
      return contact.name.indexOf(state.searchStr) >= 0;
    }),
    editContact: state.editContact,
    showModal: state.isEditFormShow,
    authorizationStatus: state.authorizationStatus,
    authorizationError: state.authorizationError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (data, method) => {
      dispatch(Operation.saveContact(data, method));
    },
    onDelete: (id) => {
      dispatch(Operation.delContact(id));

    },
    setEditContact: (data) => {
      dispatch(ActionCreator.setEditContact(data));
      dispatch(ActionCreator.switchModal());
    },
    switchModal: () => {
      dispatch(ActionCreator.switchModal());
    },
    onSearch: (searchStr) => {
      dispatch(ActionCreator.setSearchStr(searchStr));
    },
    login: (authData) => {
      dispatch(Operation.login(authData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
