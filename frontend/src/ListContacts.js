import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';

class ListContacts extends React.Component {
    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteController: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({query: query.trim()})
    }

    clearQuery = () => {
        this.setState({query: ''});
    }

    render() {
        const { contacts, onDeleteController } = this.props;
        const { query } = this.state;

        let showContacts;
        if(query) {
            const match = new RegExp(escapeRegexp(query), 'i');
            showContacts = contacts.filter(contact => match.test(contact.name));
        } else {
            showContacts = contacts;
        }
        showContacts.sort(sortBy('name'));
        return (
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts' 
                        placeholder='Search Contacts'
                        value={query}
                        onChange={(e) => this.updateQuery(e.target.value)}/>
                    <Link 
                        to='/create'
                        className='add-contact'
                    />
                </div>
                {showContacts.length !== contacts.length && 
                    <div className='showing-contacts'>
                        <span>Showing {showContacts.length} of {contacts.length} total</span>
                        <button onClick={this.clearQuery}>Show all</button>
                    </div>
                }
                <ol className='contact-list'>
                    {showContacts.map(contact => (
                        <li key={contact.id} className='contact-list-item'>
                            <div className='contact-avatar' style={{
                                backgroundImage: `url(${contact.avatarURL})`
                            }} />
                            <div className='contact-details'>
                                <p>{contact.name}</p>
                                <p>{contact.email}</p>
                            </div>
                            <button className='contact-remove' onClick={() => onDeleteController(contact.id)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}


export default ListContacts;