import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import { BsPersonCircle } from "react-icons/bs";

const HeaderNavbar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">PickBets</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Sports</Nav.Link>
                        <Nav.Link href="#features">Live Games</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <span>$1000</span>
                        <Button variant='dark'>Deposit</Button>
                        <BsPersonCircle color='white' size={30}></BsPersonCircle>
                        
                    </Form>

                </Container>

            </Navbar>
        </div>
    )
}

export default HeaderNavbar