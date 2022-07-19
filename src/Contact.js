import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { useParams, useNavigate } from "react-router-dom";
import { ContactContext } from './ContactContext'
import { useContext } from 'react'

function Contact(props) {

    let params = useParams()
    let navigate = useNavigate()

    let { getContact, deleteContact } = useContext(ContactContext)
    let contact = getContact(params.contactId)
    if (contact === undefined) { return <p>Contact Not Found.</p> }

    let { id, name, email, phone, avatar } = contact

    function handleDeleteContact(id) {
        deleteContact(id)
        navigate('/contacts')
    }
    // We also still have our handleDeleteContact function, 
    // but now it calls the deleteContact function from our context.
    // Then in the onClick handler of the "Delete" button, we're making a 
    // call to this deleteContact function, passing the id of the contact 
    // we wish to delete. 

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

export default Contact

// For this component, we previously passed the entire list of contacts as a prop and it 
// searched through the list to find the id that matched the id in the URL. In this version, 
// we're using the getContact function that is supplied in the context. In order to access the 
// context, this time we're using the useContext hook instead of wrapping elements with the 
// <ContactContext.Provider> tags. The useEffect method is more convenient in this case because 
// we want to call the function and check to see if the contact was found. Again, we're 
// destructuring the context value to only extract the getContact and deleteContact functions.