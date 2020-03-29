import React, { Component } from 'react';
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

export class Navibar extends Component {
    constructor(props){
        super(props)

        this.toggle = this.toggle.bind(this);
        
        this.state ={ 
            isOpen: false
        }
    }

    toggle(){
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const toggle = this.toggle;
        const { isOpen } = this.state
  
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
}

export default Navibar
