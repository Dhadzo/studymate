import React from 'react';
import { LinkStyles } from './styled-components';
import './logo.styles.scss'

const footerStyle = {
    height: '150px',
    position: 'absolute',
    bottom: '0',
    width: '100%',
    backgroundColor: '#1F2020'
}
const Footer = () => {
    return (
        <div className="" style={footerStyle}>
            <footer className="d-flex">
                <nav className="col-md-6">
                   <LinkStyles className="nav-link footer-logo" to = {'/'}><span className="logo1">S</span>TUDY<span className="logo1">M</span>ATE</LinkStyles>
                </nav>
               <nav className=" col-md-3">
                  <LinkStyles className="nav-link" href="">About</LinkStyles>
                  <LinkStyles className="nav-link" href="">Contact Us</LinkStyles>
                  <LinkStyles className="nav-link" href="">Privacy</LinkStyles>
               </nav>
                <nav className=" col-md-3">
                  <LinkStyles className="nav-link" href="">Support</LinkStyles>
                  <LinkStyles className="nav-link" href="">Careers</LinkStyles>
                  <LinkStyles className="nav-link" href="">Help Center</LinkStyles>
               </nav>
            </footer>
        </div>
    );
}

export default Footer;