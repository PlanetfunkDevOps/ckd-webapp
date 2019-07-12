import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { TimelineLite, Power2 } from "gsap";
import classnames from "classnames";
import "./Hero.scss";
import heroBanner from "./img/hero-banner.jpg";

export class Hero extends Component {
  constructor(props) {
    super(props);
    this.js_hero = React.createRef();
    this.js_title = React.createRef();
    this.js_text = React.createRef();
  }

  render() {
    const { step } = this.props;

    return (
      <Fragment>
        <div
          className={classnames({
            "hero d-flex f-center js_hero": step != 1,
            "hero active d-flex f-center js_hero": step == 1
          })}
          ref={this.js_hero}
        >
          <figure className="hero-overlay">
            <img src={heroBanner} alt="" />
          </figure>
          <div className="hero-content d-flex">
            <div className="hero-content__title js_title" ref={this.js_title}>
              <h2>Chef a Domicilio</h2>
            </div>
            <div
              className="hero-content__text js_text d-flex f-col"
              ref={this.js_text}
            >
              <p>
                Disfruta de una experiencia gastronomica inolvidable en la
                comodidad de tu casa con un chef a tu servicio.
              </p>
              <Link to="/reservation" className="hero-content__action">
                Empezar
              </Link>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Hero;
