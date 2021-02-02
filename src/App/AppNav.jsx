import React from "react";
// import { Layout, Menu, Breadcrumb } from "antd";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export default function AppNav() {
  // const { Header, Content, Footer } = Layout;
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Voters</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
      </Navbar>
    </div>
  );
}
