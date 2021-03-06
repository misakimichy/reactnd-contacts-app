import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import serializeForm from 'form-serialize';

/*
  CreateContact component is a standalone component and 
  used composition by adding it to the render() method in the App component.
  This is in charge of the form to create new contacts.
*/

class CreateContact extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (this.props.onCreateContact) {
      this.props.onCreateContact(values)
    }
  }
  render() {
    return (
      <div>
        {/* Add back button */}
        <Link
          className='close-create-contact'
          to='/'>
            Close
        </Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <ImageInput
            className='create-contact-avatar-input'
            name='avatarURL'
            maxHeight={64}
          />
          <div className='create-contact-details'>
            <input type='text' name='name' placeholder='Name' />
            <input type='text' name='handle' placeholder='Handle' />
            <button>Add Contact</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateContact;
