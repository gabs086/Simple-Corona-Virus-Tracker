import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    NavbarText
  } from 'reactstrap';

function Navibar(props) {

  const [isOpen, setIsOpen] = useState(false)
  
  const toggle = _ => {
    setIsOpen(!isOpen);
  }

    // toggle(){
    //     this.setState({
    //         isOpen: !this.state.isOpen
    //     })
    // }
  
        return (
            <div>
        <Navbar className="navbar navbar-dark bg-primary">
        <NavbarBrand href="/">Corona Virus Tracker</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>

            <NavItem>
              <NavLink target="_blank" href="https://github.com/gabs086/Simple-Corona-Virus-Tracker">GitHub Link Here</NavLink>
            </NavItem>


          </Nav>
          <NavbarText>By: Gabriel V. Agoncillo</NavbarText>
        </Collapse>
      </Navbar>
            </div>
        )
    }

export default Navibar
