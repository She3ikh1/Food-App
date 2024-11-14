import React from "react";
import { assets } from "../../assets/assets";
import "./Footer.css";
// import {assests}
const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.footerlogo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus,
            voluptas.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Stay In Touch</h2>
            <ul>
                <li>0335-3646139</li>
                <li>sheikhyasircaa@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 @ FoodApp.com - All Rights Reserved</p>
    </div>
  );
};

export default Footer;
