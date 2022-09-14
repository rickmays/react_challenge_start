import React, { useState, useEffect } from "react";
import { ContactForm } from '../../components/contactForm/ContactForm';
import { TileList } from '../../components/tileList/TileList';

// learned that destructuring props like this is better practice than (props)
export const ContactsPage = ({ contacts, addContact}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [duplicate, setDuplicate] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!duplicate) {
      addContact(name, phone, email);
      setName('');
      setPhone('');
      setEmail('');
    }
  };

  useEffect(() => {
    const nameIsDuplicate = () => {
      const found = contacts.find((contact) => contact.name === name);
      // Array.prototype.find() return undefined if no values satisfy the testing function
      if (found !== undefined) {
        return true;
      } else {
        return false;
      }
    };

      if (nameIsDuplicate()) {
        setDuplicate(true);
      } else {
        setDuplicate(false);
      }
  }, [name, contacts, duplicate]); // useEffect dependency array (react re-renders only when these change)



  return (
    <div>
      <section>
        <h2>
          Add Contact
          {duplicate ? " Name already Exists " : ""}  
        </h2>
        <ContactForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit} />
      </section>
      <hr />
      <section>
        <h2>Contacts</h2>
        <TileList
          tiles={contacts}
        />
      </section>
    </div>
  );
};
