import { useState, useContext } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import { ContactContext } from './ContactContext'

function ContactForm() {
  let [ contact, setContact ] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: ""
  })

  let { addContact } = useContext(ContactContext)
  let navigate = useNavigate()
  let { name, email, phone, avatar } = contact

  function handleChange(event) {
    setContact((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value }})
  }

  function handleSubmit(event) {
    event.preventDefault()
    addContact(contact)
      .then((contact) =>
        navigate(`/contacts/${contact.id}`)
      )
  }

  function getAvatar() {
    try {
      return require(`../node_modules/fake-avatars/avatars/${avatar}`)
    } catch {
      return "https://via.placeholder.com/256"
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Image src={getAvatar()} />
      <Form.Group className="mb-3" >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" value={name} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={email} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" name="phone" value={phone} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Avatar</Form.Label>
        <Form.Control type="text" name="avatar" value={avatar} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  )
}

export default ContactForm