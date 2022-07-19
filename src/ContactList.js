import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import { Link, Outlet } from 'react-router-dom'
import { ContactContext } from './ContactContext'

function ContactList(props) {
  function contactList(contacts) {
    if (contacts === null) return
    return contacts.map((contact) =>
      <ListGroup.Item key={contact.id}>
        <Link to={`/contacts/${contact.id}`} key={contact.id} >
          {contact.name}
        </Link>
      </ListGroup.Item>
    )
  }

  return (
    <>
    <h1>Contacts</h1>
    <Stack direction="horizontal" gap={3}>
    <ListGroup className="align-self-start w-75">
    <ContactContext.Consumer>
      {({contacts}) => (
        contactList(contacts)
      )}
    </ContactContext.Consumer>
    </ListGroup>
    <Outlet />
    </Stack>
    </>
  )
}

export default ContactList

//but instead of accessing the contact list from a prop, we've 
//imported the ContactContext and used the ContactContext.Consumer 
//tag to wrap the list.

//The context provides the contacts along with the supporting functions 
//(eg. updateContact, deleteContact, etc), however, since we only need 
//the contacts, we destructure the context value such that we only retrieve 
//the contacts, then pass it to our contactList function.