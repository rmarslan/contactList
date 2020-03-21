import React from 'react';
import ListContacts from './ListContacts';
import AddContact from './AddContact';
import * as apiContacts from './utils/contactsAPI';
import { Route } from 'react-router-dom';

class App extends React.Component {
    state = {
        contacts :[]
    }

    componentDidMount() {
        apiContacts.getAll()
            .then(contacts => this.setState({contacts}));
    }

    onDeleteHandler = (id) => {
        const newContacts = this.state.contacts.filter(contact => contact.id !== id);
        this.setState({contacts: newContacts});
        apiContacts.remove(id)
            .then(res => console.log(res));
    }

    createContact = (contact) => {
        apiContacts.create(contact)
            .then(contatc => {
                this.setState(state => ({
                    contacts: state.contacts.concat([ contatc ])
                }))
            })
    } 

    render() {
        return (
            <div className='app'>
                <Route exact path='/' render={() => (
                    <ListContacts 
                        contacts={this.state.contacts} 
                        onDeleteController={this.onDeleteHandler} />
                )} />
                <Route path='/create' render={({history}) => (
                    <AddContact createContact={(contact) => {
                        this.createContact(contact);
                        history.push('/');
                    }} />
                )} />
            </div>
        );
    }
}

export default App;