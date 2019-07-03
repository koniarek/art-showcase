import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Text from '../Text';
import './styles.css';

/*
 * Function: TabButton
 * Description: Renders the button in the tabbar that switches
 * between tabs.
 */
const TabButton = ({ label, active, onClick }) => {
  const classname = classnames('button button-size-small', {
    'button-state-active': active,
  });

  return (
    <Text
      className={classname}
      onClick={onClick}
    >
      {label}
    </Text>
  );
};

TabButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

/*
 * Class: Tabs
 * Description: Renders groups of content that are related and at the same
 * level of hierarchy.
 * See more: https://material.io/design/components/tabs.html#usage
 */
class Tabs extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      activeTabId: props.initialTabId,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  /*
   * Function: handleClick
   * Description: Given the next filter, calls filterByCategory and sets the
   * compoent state with the next array of filtered projects.
   */
  handleClick(event, { id: nextTabId }) {
    const { activeTabId } = this.state;

    event.preventDefault();

    if (nextTabId === activeTabId) {
      return;
    }

    this.setState({
      activeTabId: nextTabId,
    });
  }

  render() {
    const { tabs, children } = this.props;
    const { activeTabId } = this.state;

    return (
      <div className="tabs">
        <div className="tabs__bar">
          {tabs.map(tab => (
            <TabButton
              key={tab.id}
              label={tab.label}
              active={tab.id === activeTabId}
              onClick={this.handleFilter()}
            />
          ))}
        </div>
        <div className="tabs__tab">
          {children.filter(({ id }) => id === activeTabId)}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  initialTabId: PropTypes.number,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  })),
  children: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    child: PropTypes.element.isRequired,
  })),
};

Tabs.defaultProps = {
  initialTabId: 0,
  tabs: [
    { id: 0, label: 'Product Design' },
    { id: 1, label: 'Software Development' },
  ],
  children: [
    { id: 0, child: () => <div>Nothing here yet for product design.</div> },
    { id: 1, child: () => <div>Nothing here yet for software development.</div> },
  ],
};

export default Tabs;
