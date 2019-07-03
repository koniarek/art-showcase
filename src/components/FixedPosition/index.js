import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
 * Class: FixedPosition
 * Description: Gets the x,y position of of a child element and fixes it in
 * position on the screen.
 */
class FixedPosition extends Component {
  constructor(props) {
    super(props);

    this.INITIAL_STATE = {
      fixed: false,
      top: 0,
      left: 0,
      width: 0,
    };

    this.state = this.INITIAL_STATE;

    this.setFixedPosition = this.setFixedPosition.bind(this);
    this.clearFixedPosition = this.clearFixedPosition.bind(this);
    this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  componentDidMount() {
    window.scroll(0, 0);
    this.setFixedPosition();

    window.addEventListener('resize', this.handleViewportChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleViewportChange);
  }

  setFixedPosition() {
    const { disableOnSmall } = this.props;

    // If we are on a small screen, don't fix the position
    if (disableOnSmall && window.screen.width <= 600) {
      this.setState(this.INITIAL_STATE);
      return;
    }

    const position = this.element.getBoundingClientRect();
    const width = this.element.offsetWidth;

    this.setState({
      fixed: true,
      top: position.top,
      left: position.left,
      width,
    });
  }

  clearFixedPosition() {
    this.setState(this.INITIAL_STATE);
  }

  handleViewportChange() {
    window.scroll(0, 0);
    this.clearFixedPosition();
    this.setFixedPosition();
  }

  render() {
    const {
      children,
      className,
    } = this.props;

    const {
      fixed,
      top,
      left,
      width,
    } = this.state;

    let styles;

    if (fixed) {
      styles = {
        top,
        left,
        width,
        position: 'fixed',
      };
    }

    return (
      <div
        style={styles}
        className={className}
        ref={(element) => {
          this.element = element;
        }}
      >
        {children}
      </div>
    );
  }
}

FixedPosition.propTypes = {
  disableOnSmall: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  className: PropTypes.string,
};

FixedPosition.defaultProps = {
  disableOnSmall: false,
  className: null,
};

export default FixedPosition;
