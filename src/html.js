/* eslint-disable */
import React from 'react';
import Typekit from 'react-typekit';

// Is the app building in a production environment?
const PRODUCTION = process.env.NODE_ENV === 'production';

// Define a string to hold the raw styles
let rawStylesStr = null;

if (PRODUCTION) {
  try {
    rawStylesStr = require('!raw-loader!../public/styles.css');
  } catch (error) {
    throw new Error('Failed to import raw CSS to HTML template.');
  }
}

/*
 * Class: HTML
 * Description: React elements rendered at the top-level of Gatsby
 * See more: https://www.gatsbyjs.org/docs/custom-html/
 */
class HTML extends React.Component {
  render() {
    // Define an element to hold the inline styles
    let styleElement = null;

    if (PRODUCTION) {
      styleElement = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: rawStylesStr }}
        />
      );
    }

    const {
      body,
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents,
    } = this.props;

    return (
      <html lang="en" {...htmlAttributes}>
        <head>
          <Typekit kitId="utb8ujs" />
          {headComponents}
          {styleElement}
        </head>
        <body {...bodyAttributes}>
          {preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {postBodyComponents}
        </body>
      </html>
    );
  }
}

export default HTML;
