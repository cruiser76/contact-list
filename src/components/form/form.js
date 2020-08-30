import React, {Component} from 'react';
import {nanoid} from 'nanoid';
import './form.css';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ``,
    };
    this.id = ``;
  }

  componentDidUpdate(prevProps) {
    const {editContact} = this.props;

    if (prevProps.editContact !== editContact) {
      this.setState({
        name: editContact.name,
      });
      this.id = editContact.id;
    }
  }

  render() {
    const {onSubmit, showModal, editContact, setEditContact} = this.props;
    const {name} = this.state;

    return (
      <form
        className={`modal w-50 border border-primary form-edit jumbotron ${showModal ? `form-edit--show` : ``}`}
        action="#"
        onSubmit={(evt) => {
          evt.preventDefault();
          if (!this.id) {
            this.id = nanoid();
            onSubmit({name, id: this.id}, `post`);
          } else {
            onSubmit({name, id: this.id}, `patch`);
          }
          setEditContact({name: ``, id: ``});
        }}>
        <div className="form-group w-100">
          <input
            className="form-control "
            type="text"
            onChange={(evt) => this.setState({name: evt.target.value})}
            value={name}
          />
          <button className="btn btn-primary mt-2" type="submit">{editContact.id ? `Редактировать контакт` : `Создать контакт`}</button>
        </div>

        <button
          className="btn btn-outline-primary float-right border-0 position-absolute"
          style={{top: `0`, right: `0`}}
          width="1em" height="1em"
          onClick={(evt) => {
            evt.preventDefault();
            this.setState({name: ``});
            setEditContact({name: ``, id: ``});
          }}
        >
          <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </form>
    );
  }
}

export default ContactForm;
