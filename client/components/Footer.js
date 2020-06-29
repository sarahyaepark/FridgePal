import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Footer = ({ handleClick, isLoggedIn }) => (
  <div className="footer">
    {isLoggedIn ? (
      <div className="footerContainer">
        {/* The navbar will show these links after you log in */}
        <div className="footerItem">
          <Link to="/home">
            <img
              src="https://cdn.onlinewebfonts.com/svg/img_8727.png"
              width="40px"
              height="40px"
            />
            <p>My Fridge</p>
          </Link>
        </div>
        <div className="footerItem">
          <Link to="/recipes">
            <img
              src="https://i.dlpng.com/static/png/1574788-kitchen-plate-spoon-fork-egg-recipe-comments-egg-and-spoon-png-980_850_preview.png"
              width="40px"
              height="35px"
            />
            <p>Recipes</p>
          </Link>
        </div>
        <div className="footerItem">
          <a href="#" onClick={handleClick}>
            <img
              src="https://cdn.iconscout.com/icon/free/png-256/logout-37-459247.png"
              width="40px"
              height="40px"
            />
            <p>Logout</p>
          </a>
        </div>
      </div>
    ) : null}
  </div>
);

export default Footer;
