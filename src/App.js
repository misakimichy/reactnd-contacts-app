import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';

class App extends Component {
  state = {
    contacts: []
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
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        {/* <Route exact path='/' render={() => ( */}
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
          />
        {/* )} /> */}
        {/* <Route path='/create' render={({ history }) => ( */}
          <CreateContact
            onCreateContact={(contact) => {
              this.createContact(contact)
              // history.push('/')
            }}
          />
        {/* )} /> */}
      </div>
    )
  }
}

export default App
