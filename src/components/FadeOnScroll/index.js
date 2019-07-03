import React, { Component } from 'react'

/*
 * Class: FadeOnScroll
 * Description:
 */
class FadeOnScroll extends Component {
  constructor(props) {
    super(props);

    this.INITIAL_STATE = {
      top: 0,
      maxTop: 600,
    };

    this.state = this.INITIAL_STATE;

    this.handleScrollChange = this.handleScrollChange.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScrollChange);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScrollChange);
  }

  handleScrollChange() {
    if (window.pageYOffset < this.state.maxTop) {
      this.setState({
        top: window.pageYOffset,
      })
    }
  }

  render() {
    const { children } = this.props;
    const { top, maxTop } = this.state;

    let percentage = ((maxTop - top) / maxTop);

    if (percentage < 0.1) {
      percentage = 0;
    }

    const styles = {
      opacity: percentage,
    };

    return (
      <div
        style={styles}
        ref={(element) => {
          this.element = element;
        }}
      >
        {children}
      </div>
    );
  }
}

export default FadeOnScroll;
