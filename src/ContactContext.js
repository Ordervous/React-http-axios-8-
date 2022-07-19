import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const ContactContext = createContext()

export const ContactProvider = (props) => {
    const [contacts, setContacts] = useState([])

    useEffect(() => {    //we utilize the useEffect hook to run when the component is mounted, and this hook calls an async function
        async function getContacts() {
            await refreshContacts()
        }
        getContacts() //also supply a simple getContact method that can search for a contact in the list by id and return the object.
    }, []);

    function refreshContacts() {  // function uses axios to fetch our entire list of contacts and update them in our state. 
        return axios.get("http://localhost:3001/contacts")
            .then(response => {
                setContacts(response.data)
            })
    }

    // function getContact(id) {
    //     return contacts.find(contact => contact.id === parseInt(id))
    // } // To demonstrate how to fetch the individual contact, we'll update our function to make the call to the server and display the result.

    function getContact(id) {
        return axios.get(`http://localhost:3001/contacts/${id}`)
          .then(Response =>
            new Promise((resolve) => resolve(Response.data))
          )
      }  // Here we're using axios to get the individual contact for the given id. 
    //   However, when the Promise from axios resolves, we're returning a new Promise 
    //   that returns only the contact data. The purpose of this is to insulate the 
    //   caller from the details of the HTTP response. The caller only needs the contact 
    //   data, not the axios response object. This would also be the correct place to put 
    //   any additional error handling before returning to the caller.    

    function deleteContact(id) {
        axios.delete(`http://localhost:3001/contacts/${id}`).then(refreshContacts)
    } // In deleteContact we call the delete method on axios, passing it the URL of the resource we wish 
    // to delete which will make the HTTP DELETE call to our json-server.
    // Since we're not inside a useEffect hook we don't need to be concerned with making the call asynchronous. 
    // After the contact is deleted, we want to make sure our contact list and UI reflect that change. 
    // We can simply use the Promise returned from axios to then call our refreshContacts method.

    // In this instance we don't need anything from the result of the DELETE HTTP call, so we can simply pass 
    // a reference to refreshContacts instead of invoking it in an anonymous function.

    function addContact(contact) {
    }

    function updateContact(contact) {
    }

    return (
        <ContactContext.Provider
            value={{
                contacts,
                getContact,
                deleteContact,
                addContact,
                updateContact
            }}
        > 
            {props.children} 
        </ContactContext.Provider>
    )
}
//we utilize the props.children feature to wrap any content within 
// our new ContactProvider component's tags

//Since we want to make the ContactContext available to the entire app, 
// we'll modify our index.js file to wrap our App component: