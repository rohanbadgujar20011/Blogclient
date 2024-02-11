import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { authActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
const NavComp = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("is user login" + isLoggedIn);
  const [value, setValue] = useState();
  const navigate = useNavigate();

  async function handlelogout(e) {
    dispatch(authActions.logout());
    navigate("/login");
  }

  return (
    <div>
      <Navbar
        expand="lg"
        bg="primary"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container fluid>
          <Navbar.Brand href="/">BlogSphere</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            {isLoggedIn && (
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Nav.Link href="/">All Blogs</Nav.Link>
                <Nav.Link href="/myblogs">My Blogs</Nav.Link>
                <Nav.Link href="/addblog">Add Blog</Nav.Link>
                {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown> */}
                {/* <Nav.Link href="#" disabled>
                  Link
                </Nav.Link> */}
              </Nav>
            )}
            <Form className="d-flex">
              {!isLoggedIn && (
                <>
                  <Button variant="outline-success" className="me-2">
                    <Link
                      to={"/login"}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button variant="outline-success">
                    <Link
                      to={"/signup"}
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Signup
                    </Link>
                  </Button>
                </>
              )}

              {isLoggedIn && (
                <>
                  <Button variant="outline-success" onClick={handlelogout}>
                    Logout
                  </Button>
                </>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavComp;
