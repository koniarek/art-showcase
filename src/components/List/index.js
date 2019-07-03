import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ListItem from '../ListItem';

const defaultKeyExtractor = ({ id }) => id;

/*
 * Function: List
 * Description: Renders a list of elements
 */
const List = (props) => {
  const {
    items,
    keyExtractor,
  } = props;

  return items && Array.isArray(items.edges) ? (
    <Fragment>
      {items.edges.map(({ node: { frontmatter, fields, ...restNode } }) => (
        <ListItem
          key={keyExtractor(restNode)}
          title={frontmatter.title}
          excerpt={frontmatter.description}
          date={frontmatter.date}
          path={frontmatter.path}
          category={frontmatter.category}
          linkTo={fields.slug}
        />
      ))}
    </Fragment>
  ) : (<span>{'There\'s nothing here yet.'}</span>);
};

List.propTypes = {
  items: PropTypes.shape({
    totalCount: PropTypes.number.isRequired,
    edges: PropTypes.arrayOf(PropTypes.shape({
      node: PropTypes.shape({
        fields: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }).isRequired,
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          image: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              sizes: PropTypes.shape({
                aspectRatio: PropTypes.number.isRequired,
                base64: PropTypes.string.isRequired,
                sizes: PropTypes.string.isRequired,
                src: PropTypes.string.isRequired,
                srcSet: PropTypes.string.isRequired,
              }),
            }),
          }),
          description: PropTypes.string.isRequired,
          category: PropTypes.string,
          date: PropTypes.string.isRequired,
        }),
      }).isRequired,
    })).isRequired,
  }),
  keyExtractor: PropTypes.func,
};

List.defaultProps = {
  items: null,
  keyExtractor: defaultKeyExtractor,
};

export default List;
