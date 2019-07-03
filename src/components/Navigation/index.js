import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import './styles.css';

/*
 * Function: NavigationItemLink
 * Description: Renders a link in the website navigation
 */
const NavigationLink = ({ pathname, label, position }) => (
  <Link
    to={`/${pathname}/`}
    className={`site-navigation__item site-navigation__item-position-${position}`}
    activeClassName="site-navigation__item-state-active"
  >
    {label}
  </Link>
);

NavigationLink.propTypes = {
  label: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['top', 'bottom']).isRequired,
};

/*
 * Function: NavigationItemLink
 * Description: Renders an array of navigation links
 */
const Navigation = ({ links, position }) => {
  const element = links ? (
    <nav className="site-navigation">
      {links.map(({ label, pathname }) => (
        <NavigationLink
          key={label}
          label={label}
          pathname={pathname}
          position={position}
        />
      ))}
    </nav>
  ) : null;

  return element;
};

Navigation.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  })).isRequired,
  position: PropTypes.oneOf(['top', 'bottom']).isRequired,
};

Navigation.defaultProps = {
  links: [
    { label: 'work', pathname: 'work' },
    { label: 'writing', pathname: 'writing' },
    { label: 'about', pathname: 'about' },
  ],
};

export default Navigation;
