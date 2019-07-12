import React, { Component, Fragment } from "react";
import { TimelineLite, Power2 } from "gsap";
import classnames from "classnames";
import "./Chef.scss";
import chefBanner from "./img/chef-banner.jpg";
import chefProfile from "./img/chef-profile.jpg";

export class Chef extends Component {
  constructor(props) {
    super(props);
    this.js_chef = React.createRef();
  }

  render() {
    const { step } = this.props;

    return (
      <Fragment>
        <div
          className={classnames({
            "chef--section d-flex f-center js_chef": step != 3,
            "chef--section active d-flex f-center js_chef": step == 3
          })}
          ref={this.js_chef}
        >
          <figure className="chef--section-overlay">
            <img src={chefBanner} alt="" />
          </figure>
          <div className="chef--section-content d-flex">
            <div className="chef--section-content__title">
              <h2>Nuestros Chefs</h2>
            </div>
            <div className="chef--section-content__text d-flex f-col">
              <figure>
                <img src={chefProfile} alt="" />
              </figure>
              <p>
                Disfruta de una experiencia gastronomica inolvidable en la
                comodidad de tu casa con un chef a tu servicio.
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Chef;
