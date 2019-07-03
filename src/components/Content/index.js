import React from 'react';
import PropTypes from 'prop-types';
import Column from '../Column';
import Newsletter from '../Newsletter';

/*
 * Function: getElementFromChildrenProps
 * Description: Returns an element based off the
 * children provided in the props.
 */
const getElementFromChildrenProps = (childrenFromProps) => {
  const element = typeof childrenFromProps === 'string' ? (
    <div dangerouslySetInnerHTML={{ __html: childrenFromProps }} />
  ) : childrenFromProps;

  return element;
};

/*
 * Function: Content
 * Description:
 */
const Content = (props) => {
  const {
    children,
    className,
    newsletter,
    flexOrderSmall,
    flexOrderLarge,
  } = props;

  return (
    <Column
      className={className}
      largeSize={6}
      smallSize={12}
      flexOrderSmall={flexOrderSmall}
      flexOrderLarge={flexOrderLarge}
    >
      {getElementFromChildrenProps(children)}
      {newsletter && <Newsletter />}
    </Column>
  );
};

Content.propTypes = {
  className: PropTypes.string,
  flexOrderSmall: PropTypes.number,
  flexOrderLarge: PropTypes.number,
  newsletter: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

Content.defaultProps = {
  className: null,
  flexOrderSmall: null,
  flexOrderLarge: null,
  newsletter: false,
};


export default Content;
