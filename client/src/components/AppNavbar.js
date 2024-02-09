import React, {Fragment, useState} from 'react'
import {Navbar, Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

function AppNavbar() {

  const dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

const isAuth = useSelector((state)=> state.authReducer.isAuth)
const user = useSelector((state)=> state.authReducer.user)
 const toggleNavbar =()=>{
  setIsOpen(!isOpen)
 }

 const logoutUser =()=> {
  dispatch(logout());
  navigate('/')
 }

 const authLinks = (
  <Fragment>
    <NavItem>
      <Link to ='/daschboard' >
        <span>
          <strong>{user? `Welcome ${user.name}` : null}</strong>
        </span>
      </Link>
    </NavItem>
    <NavLink href='#' onClick={logoutUser}>Logout</NavLink>
  </Fragment>
 )


 const guestLinks = (
  <Fragment>
  <NavItem>
  <RegisterModal/>
</NavItem>
<NavItem>
  <LoginModal/>
</NavItem>
</Fragment>
 )

  return (
    <div>
         <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
             
             {isAuth ? authLinks : guestLinks}

            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default AppNavbar