import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { useParams, useNavigate, Link } from "react-router-dom";
import { ContactContext } from './ContactContext'
import { useContext, useState, useEffect } from 'react'

function Contact(props) {

    let params = useParams()
    let navigate = useNavigate()

    let { getContact, deleteContact } = useContext(ContactContext)
    let [ contact, setContact ] = useState()
    
    // let contact = getContact(params.contactId)
    // if (contact === undefined) { return <p>Contact Not Found.</p> }

    useEffect(() => {
        async function fetch() {
            await getContact(params.contactId)  // we've added the useEffect hook to load the desired contact when the component is mounted.
                .then((contact) => setContact(contact)) // we supply params.contactId as part of the useEffect's dependency array. 
        } // This ensures that we will only re-run the hook if the contactId changes allowing us to fetch the new contact data from the API.
        fetch()
    }, [params.contactId]);

    function handleDeleteContact(id) {
        deleteContact(id)
        navigate('/contacts')
    }
    // We also still have our handleDeleteContact function, 
    // but now it calls the deleteContact function from our context.
    // Then in the onClick handler of the "Delete" button, we're making a 
    // call to this deleteContact function, passing the id of the contact 
    // we wish to delete. 

    function loading() {
        return <div className="w-25 text-center"><Spinner animation="border" /></div>
    } // If our contact is undefined, then we call the loading function to render the spinner.
    // If the contact id has changed, we also call loading.
    // Otherwise, we render the contactCard function which displays the contact just as we did before.

    function contactCard() {
        let { id, name, email, phone, avatar } = contact
        return (
            <Card className="align-self-start w-25">
                <Card.Img variant="top" src={require(`../node_modules/fake-avatars/avatars/${avatar}`).default} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
                    <Card.Text>
                        <strong>Phone:</strong> <span>{phone}</span>
                    </Card.Text>
                    <Button variant="danger" onClick={handleDeleteContact.bind(this, id)}>Delete</Button>
                </Card.Body>
            </Card>
        )
    }
    if (contact === undefined) return loading()
    return contact.id !== parseInt(params.contactId) ? loading() : contactCard()
}

export default Contact


// For this component, we previously passed the entire list of contacts as a prop and it 
// searched through the list to find the id that matched the id in the URL. In this version, 
// we're using the getContact function that is supplied in the context. In order to access the 
// context, this time we're using the useContext hook instead of wrapping elements with the 
// <ContactContext.Provider> tags. The useEffect method is more convenient in this case because 
// we want to call the function and check to see if the contact was found. Again, we're 
// destructuring the context value to only extract the getContact and deleteContact functions.