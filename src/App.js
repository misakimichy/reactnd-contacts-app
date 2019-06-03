import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';
import CreateContact from './CreateContact';
import { Route } from 'react-router-dom';

class App extends Component {
  state = {
    contacts: [],
    // screen property is used to control what content should display on the screen.
    screen: 'list',
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
    /* 
      When the removeContact is invoked, 
      invoke the remove method from ContactAPI.js 
    */
    ContactsAPI.remove(contact)
  }

  render() {
    return (
      <div>
        {/* When the path matched '/' url, render ListContacts Component */}
        <Route exact path='/' render={() => (
          <ListContacts
            contacts={this.state.contacts}
            onDeleteContact={this.removeContact}
            // toggle screen state between 'list' and 'create'
            onNavigate={() => {
              this.setState(() => ({
                screen: 'create'
              }));
            }}
          />
        )}/>
        <Route path='/create' component={CreateContact}
          />
      </div>
    )
  }
}

export default App;
