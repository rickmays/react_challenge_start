import React, {useState} from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
  /*
  Define state variables for 
  contacts and appointments 
  */
  const [contacts, setContacts] = useState(
    [
      {name: 'John Doe', phone: '210-555-1212', email: 'johndoe@test.com'},
      {name: 'Jane Doe', phone: '210-555-2424', email: 'janedoe@test.com'}
    ]);

  const [appointments, setAppointments] = useState(
    [
      {title: 'interview', contact: {}, date: '09/30/2022', time: '12:00 PM'}  
    ]);

  const ROUTES = {
    CONTACTS: "/contacts",
    APPOINTMENTS: "/appointments",
  };

  /*
  Implement functions to add data to
  contacts and appointments
  */
  const addContact = (name, phone, email) => {
    const contact = {name: name, phone: phone, email: email};
    setContacts(prevState => [...prevState, contact]); 
  }

  const addAppointment = (title, contact, date, time) => {
    const appointment = {title: title, contact: contact, date: date, time: time};
    setAppointments(prevState => [...prevState, appointment]);
  }


  return (
    <>
      <nav>
        <NavLink to={ROUTES.CONTACTS} activeClassName="active">
          Contacts
        </NavLink>
        <NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
          Appointments
        </NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Redirect to={ROUTES.CONTACTS} />
          </Route>
          <Route path={ROUTES.CONTACTS}>
             {/* Add props to ContactsPage */}
            <ContactsPage
              contacts={contacts}
              setContacts={setContacts}
              />
          </Route>
          <Route path={ROUTES.APPOINTMENTS}>
            {/* Add props to AppointmentsPage */}
            <AppointmentsPage
              appointments={appointments}
              setAppointments={setAppointments}
              />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
