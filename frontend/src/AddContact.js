import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ImageInput from './ImageInput';
import formSerialize from 'form-serialize';

class AddContact extends Component {

    handleSubmit = e => {
        e.preventDefault();
        const contact = formSerialize(e.target, {hash: true});
        if(this.props.createContact)
            this.props.createContact(contact);
    }

    render() {
        return (
            <div>
                <Link to='/' className='close-create-contact'>close</Link>
                <form className='create-contact-form' onSubmit={this.handleSubmit}>
                    <ImageInput 
                        className='create-contact-avatar-input'
                        name='avatarUrl'
                        maxHeight={64}
                    />
                    <div className='create-contact-details'>
                        <input type='text' name='name' placeholder="Name" />
                        <input type='text' name='email' placeholder="Email" />
                        <button>add contact</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddContact;