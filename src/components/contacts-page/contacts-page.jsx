import React from 'react';
import ContactForm from '../form/form';
import ContactsList from '../contacts-list/contacts-list.jsx';
import AddContact from '../add-contact/add-contact.jsx';
import Search from '../search/search.jsx';

const ContactPage = (props) => {
  return (
    <div className='jumbotron container-sm position-relative'>
      <h1 className="display-4 text-center">Список контактов</h1>
      <Search onSearch={props.onSearch} />
      <ContactsList {...props} />
      <ContactForm {...props} />
      <AddContact switchModal={props.switchModal} />
    </div>
  );
};

export default ContactPage;
