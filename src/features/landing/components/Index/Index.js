import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { TimelineLite, Power2, Back } from "gsap";
import "./Index.scss";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.js_index = React.createRef();
  }

  componentDidMount() {
    const tl = new TimelineLite();

    tl.from(this.js_index.current, 0.5, {
      opacity: 0,
      y: 40,
      delay: 0.5,
      ease: Back.easeInOut
    });
  }

  handleClick = id => {
    this.props.handleStepIndex(id);
  };

  render() {
    return (
      <Fragment>
        <div className="index">
          <nav
            className="index-nav d-flex f-justify js_index"
            ref={this.js_index}
          >
            <Link
              to="#"
              onClick={() => this.handleClick("1")}
              className="index-nav__link"
            >
              01. Inicio
            </Link>
            <Link
              to="#"
              onClick={() => this.handleClick("2")}
              className="index-nav__link"
            >
              02. ¿Como Funciona?
            </Link>
            <Link
              to="#"
              onClick={() => this.handleClick("3")}
              className="index-nav__link"
            >
              03. Nuestros Chefs!
            </Link>
            <Link
              to="#"
              onClick={() => this.handleClick("4")}
              className="index-nav__link"
            >
              04. Servicios
            </Link>
          </nav>
        </div>
      </Fragment>
    );
  }
}

export default Index;
