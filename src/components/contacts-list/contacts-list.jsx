import React from 'react';

import ContactItem from './../contact-item/contact-item.jsx';

const ContactsList = (props) => {
  const {contacts, onDelete, setEditContact, showModal} = props;
  const contactsList = contacts.map((el) => {
    return (
      <ContactItem
        contact={el}
        onDelete={onDelete}
        setEditContact={setEditContact}
        showModal={showModal}
        key={el.id} />
    );
  });

  return (
    <div className="text-left list-group">
      {contactsList}
    </div>
  );
};

export default ContactsList;
