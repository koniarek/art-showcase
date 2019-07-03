import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import './styles.css';

/*
 * Function: ListItem
 * Description: Renders the an item in a list
 * with title, image, excerpt, etc.
 */
const ListItemDetails = (props) => {
  const {
    title,
    image,
    excerpt,
    category,
    date,
  } = props;

  return (
    <article className="list-item">
      <div className="list-item--background">
        {image && (
          <Img
            className="list-item__featured-image"
            title={title}
            alt={excerpt}
            sizes={image.childImageSharp.sizes}
          />
        )}
        <p className="list-item__title">
          {title.toLowerCase()}
        </p>
        <span className="list-item__details">
          <small>
            {category && (
              <span className="list-item__details-category">
                {category.toLowerCase()}
              </span>
            )}
            <time className="list-item__details-year">
              {date}
            </time>
          </small>
        </span>
      </div>
    </article>
  );
};

ListItemDetails.propTypes = {
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
  excerpt: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string.isRequired,
};

ListItemDetails.defaultProps = {
  image: null,
  excerpt: null,
  category: null,
};

/*
 * Function: ListViewItem
 * Description: Renders a single linked item in a list of items
 */
const ListItem = (props) => {
  const {
    title,
    image,
    excerpt,
    category,
    date,
    linkTo,
  } = props;

  return (
    <Link
      to={linkTo}
      title={title}
      className="list-item__link"
    >
      <ListItemDetails
        title={title}
        image={image}
        excerpt={excerpt}
        category={category}
        date={date}
      />
    </Link>
  );
};

ListItem.propTypes = {
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
  excerpt: PropTypes.string,
  category: PropTypes.string,
  date: PropTypes.string.isRequired,
  linkTo: PropTypes.string.isRequired,
};

ListItem.defaultProps = {
  image: null,
  excerpt: null,
  category: null,
};

export default ListItem;
