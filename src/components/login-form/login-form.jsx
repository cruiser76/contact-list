import React, {Component} from 'react';
import './login-form.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: `test@test.com`,
      password: `12345`
    };
  }

  render() {
    return (
      <form
        className={this.props.authorizationError ? `login-form` : ``}
        action="#"
        onSubmit={(evt) => {
          evt.preventDefault();
          this.props.login(this.state);
        }}>
        <div
          className="form-group"
        >
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            required
            className="form-control"
            id="exampleInputEmail1"
            type="email"
            onChange={(evt) => this.setState({mail: evt.target.value})}
            value={this.state.mail}
          />
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              required
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(evt) => this.setState({password: evt.target.value})}
              value={this.state.password}
            />
          </div>
          <button className="btn btn-primary mt-2" type="submit">Авторизоваться</button>
        </div>
      </form>
    );
  }
}

export default LoginForm;
