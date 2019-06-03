import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
  }

  // Fetch contacts data from a remote server
  componentDidMount() {
    ContactsAPI.getAll()
      // Once you get the data, update the local state.
      .then(contacts => {
        this.setState(() => ({
          contacts
        }))
      })
  }

  removeContact = contact => {
    this.setState(currentState => ({
      contacts: currentState.contacts.filter(c => {
        return c.id !== contact.id
      })
    }))
    /* 
      When the removeContact is invoked, 
      invoke the remove method from ContactAPI.js 
    */
    ContactsAPI.remove(contact)
  }

  createContact = contact => {
    ContactsAPI.create(contact)
      .then(contact => {
        this.setState(currentState => ({
          contacts: currentState.contacts.concat([contact])
        }))
      })
  }

  render() {
    return (
      <div>
        {/* When the path matched '/' url, render ListContacts Component */}
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        )} />
        <Route path='/create' render={({ history }) => (
          <CreateContact
          onCreateContact={contact => {
            this.createContact(contact)
            // Redirect us to the home route.
            history.push('/')
          }}
          />
        )} />
      </div>
    )
  }
}

export default App;
