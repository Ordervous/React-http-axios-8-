import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import { Link, Outlet } from "react-router-dom"

function Home() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/contacts" className="nav-link">Contacts</Link>
          </Nav>
        </Container>
      </Navbar>
      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
    </>
  )
}

export default Home