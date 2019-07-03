import React from 'react';
import PropTypes from 'prop-types';
import Column from '../Column';
import FixedPosition from '../FixedPosition';

const Sidebar = (props) => {
  const {
    children,
    largeSize,
    smallSize,
    flexOrderLarge,
    flexOrderSmall,
    hideOnLarge,
    hideOnSmall,
    className,
  } = props;

  return (
    <Column
      elementType="aside"
      className={className}
      largeSize={largeSize}
      smallSize={smallSize}
      flexOrderLarge={flexOrderLarge}
      flexOrderSmall={flexOrderSmall}
      hideOnSmall={hideOnSmall}
      hideOnLarge={hideOnLarge}
    >
      <FixedPosition disableOnSmall>
        {children}
      </FixedPosition>
    </Column>
  );
}

Sidebar.defaultProps = {
  largeSize: 3,
  smallSize: 12,
  hideOnLarge: false,
  hideOnSmall: false,
  className: null,
  flexOrderLarge: null,
  flexOrderSmall: null,
};

Sidebar.propTypes = {
  className: PropTypes.string,
  largeSize: PropTypes.number,
  smallSize: PropTypes.number,
  hideOnSmall: PropTypes.bool,
  hideOnLarge: PropTypes.bool,
  flexOrderLarge: PropTypes.number,
  flexOrderSmall: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Sidebar;
