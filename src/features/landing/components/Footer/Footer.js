import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

export class Footer extends Component {
  render() {
    return (
      <Fragment>
        <footer className="footer-container d-flex f-justify">
          <div className="footer-content">
            <p />
          </div>
          <nav className="footer-social-nav">
            <ul className="footer-social-nav__list d-flex f-justify">
              <li className="footer-social-nav__item">
                <Link
                  to="#"
                  className="footer-social-nav__link d-flex f-center"
                >
                  <i className="fab fa-facebook-f" />
                </Link>
              </li>
              <li className="footer-social-nav__item">
                <Link
                  to="#"
                  className="footer-social-nav__link d-flex f-center"
                >
                  <i className="fab fa-twitter" />
                </Link>
              </li>
            </ul>
          </nav>
        </footer>
      </Fragment>
    );
  }
}

export default Footer;
