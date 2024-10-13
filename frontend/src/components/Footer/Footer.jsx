import React from 'react';
import './Footer.css'; // Link to your CSS file
import logo from '../../assets/logo.svg'
import paypal from '../../assets/paypal.svg'
import mastercard from '../../assets/mastercard.svg'
import visa from '../../assets/visa.svg'
import american_express from '../../assets/american express.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faInstagram, faPinterest, faYoutube } from '@fortawesome/free-brands-svg-icons';
const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-section company-info">
                    <div className="company-logo">
                        <img src={logo} alt="Company Logo" />
                    </div>
                    <p>
                        Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum.
                        Cras egestas purus.
                    </p>
                    <div className="social-icons">
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#"><FontAwesomeIcon icon={faPinterest} /></a>
                        <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                    </div>
                </div>
                <div className="footer-section category">
                    <h4>Category</h4>
                    <ul>
                        <li><a href="#">Sofa</a></li>
                        <li><a href="#">Armchair</a></li>
                        <li><a href="#">Wing Chair</a></li>
                        <li><a href="#">Desk Chair</a></li>
                        <li><a href="#">Wooden Chair</a></li>
                        <li><a href="#">Park Bench</a></li>
                    </ul>
                </div>
                <div className="footer-section support">
                    <h4>Support</h4>
                    <ul>
                        <li><a href="#">Help & Support</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Help</a></li>
                    </ul>
                </div>
                <div className="footer-section newsletter">
                    <h4>Newsletter</h4>
                    <div className="newsletter-input">
                        <input type="email" placeholder="Your email" />
                        <button type="submit">Subscribe</button>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam tincidunt erat enim.
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>@ 2021 - Blogy - Designed & Developed by <span>Zokirosoft</span></p>
                <div className="payment-icons">
                    <img src={paypal} alt="PayPal" />
                    <img src={mastercard} alt="MasterCard" />
                    <img src={visa} alt="Visa" />
                    <img src={american_express} alt="American express" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;