import React from 'react';
import LoginForm from '../login-form/login-form.jsx';

const LoginPage = (props) => {
  return (
    <div className='jumbotron container-sm position-relative'>
      <h1 className="display-4 text-center">Авторизация</h1>
      <LoginForm {...props} />
    </div>
  );
};

export default LoginPage;
