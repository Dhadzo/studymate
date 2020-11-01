import React from 'react';
import {LinkStyles} from './styled-components';
import { Col, Nav } from 'react-bootstrap';

const Navigation = () =>  {

    return (
        <Col lg={2}className="position-fixed border-right" style={{marginTop:'50px'}} >
           <Nav className="ml-5 min-vh-100">
               <ul className="navbar-nav">
                   <li className="nav-item mb-2">
                      <LinkStyles className="nav-link" to={'/home'}>Home</LinkStyles>
                   </li>
                   <li className="nav-item mb-2">
                     <LinkStyles className="nav-link" to={'/notifications'}>Notifications</LinkStyles>
                   </li>
                   <li className="nav-item mb-2">
                     <LinkStyles className="nav-link" to={'/profile'}>Profile</LinkStyles>
                   </li>
                   <li className="nav-item mb-2">
                     <LinkStyles className="nav-link" to={'/chats'}>Chats</LinkStyles>
                   </li>
                   
                   
                  
               </ul>
           </Nav>
        </Col>
    );
}

export default Navigation;