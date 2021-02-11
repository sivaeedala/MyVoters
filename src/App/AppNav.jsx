import React from "react";
// import { Layout, Menu, Breadcrumb } from "antd";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function AppNav() {
  // const { Header, Content, Footer } = Layout;
  const { userName, ward, village } = useSelector((state) => state);
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Voters</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {userName !== "" && userName === "Sudheer678" ? (
            <Nav className="mr-auto">
              {/* <Nav.Link>
                  Voters
                  </Nav.Link>
              <Nav.Link href="#pricing">Ward Teams</Nav.Link> */}
              <Nav.Link>
                <Link to="/voters">Voters</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/teams">Teams</Link>
              </Nav.Link>
            </Nav>
          ) : (
            ""
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default connect()(AppNav);
