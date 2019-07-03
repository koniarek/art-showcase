import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Navigation from '../../components/Navigation';
import Row from '../../components/Row';
import Column from '../../components/Column';
import Site from '../../components/Site';
import './styles.css';

/**
 * Header
 * Renders the global website header
 */
const Header = ({ links, rowSize }) => (
  <Site.Consumer>
    {({ title, header }) => header && (
      <header role="banner" className="site-header">
        <Row rowSize={rowSize}>
          <Column largeSize={3} smallSize={12}>
            <Link to="/" className="site-header__title">
              psb
            </Link>
          </Column>
          <Column largeSize={9} smallSize={12}>
            <Navigation position="top" />
          </Column>
        </Row>
      </header>
    )}
  </Site.Consumer>
);

Header.propTypes = {
  rowSize: PropTypes.string,
};

Header.defaultProps = {
  rowSize: 'large',
};

export default Header;
