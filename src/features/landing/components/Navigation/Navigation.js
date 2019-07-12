import React, { Component, Fragment } from 'react';
import { TimelineLite, Power2 } from 'gsap';
import './Navigation.scss';

export class Navigation extends Component {
  constructor(props) {
    super(props);
    this.js_nav = React.createRef();
  }

  componentDidMount() {
    const tl = new TimelineLite();

    tl.from(this.js_nav.current, 0.5, {
      opacity: 0,
      x: 40,
      delay: 0.5,
      ease: Power2.easeInOut
    });
  }

  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    return (
      <Fragment>
        <div
          className='navigation d-flex f-center f-col js_nav'
          ref={this.js_nav}
        >
          <button onClick={this.back} className='navigation__button nav-up'>
            <i className='fas fa-angle-double-up' />
          </button>
          <span>Scroll</span>
          <button
            onClick={this.continue}
            className='navigation__button nav-down active'
          >
            <i className='fas fa-angle-double-down' />
          </button>
        </div>
      </Fragment>
    );
  }
}

export default Navigation;
