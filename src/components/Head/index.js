import React from 'react';
import Helmet from 'react-helmet';
import Site from '../Site';

const Head = (props) => (
  <Site.Consumer>
    {(site) => { 
      const description = props.description || site.description;
      const keywords = props.keywords || site.keywords;

      const publicCards = "";
      const imageUrl = "";

      return (
        <Helmet
          defaultTitle={site.title}
          title={props.title}
          titleTemplate={`%s - ${site.title}`}
          meta={[
            { charSet: 'utf-8' },
            { httpEquiv: 'x-ua-compatible', content: 'ie=edge' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover' },
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            { name: 'og:type', content: 'website' },
            { name: 'og:site_name', content: site.title },
            { name: 'og:url', content: site.url },
            { name: 'og:title', content: props.title },
            { name: 'og:description', content: description },
            { name: 'og:image', content: !imageUrl ? `${publicCards}/facebook.png` : `${site.url}${imageUrl}` },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: !imageUrl ? `${publicCards}/twitter.png` : `${site.url}${imageUrl}` },
            { name: 'twitter:site', content: '@pburtchaell' },
            { name: 'twitter:domain', content: site.title },
            { name: 'twitter:title', content: props.title },
            { name: 'twitter:description', content: description },
            { name: 'theme-color', content: '#FFFFFF' },
          ]}
        />
      );
    }}
  </Site.Consumer>
);

export default Head;
