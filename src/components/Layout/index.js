import 'normalize.css';
import '../../styles/index.css';
import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Footer from '../Footer';
import Head from '../Head';
import Header from '../Header';
import Site from '../Site';
import Row from '../Row';
import Content from '../Content';
import Sidebar from '../Sidebar';
import Text, { types as textTypes } from '../Text';
import FadeOnScroll from '../FadeOnScroll';
import './styles.css';

// Fetch all site metadata and passes it down to context
const Metadata = ({ children }) => (
  <StaticQuery
    query={graphql`
      query siteMetadata {
        site {
          metadata: siteMetadata {
            url
            title
            description
            keywords
          }
        }
      }`
    }
    render={({ site }) => (
      <Site.Provider
        value={{
          ...site.metadata,
          header: true,
          footer: true,
        }}
      >
        {children}
      </Site.Provider>
    )}
  />
);

const HolyGrailLayout = ({ leftShark, rightShark, children }) => (
  <>
    <Header />
    <main role="main" className="site-main-content">
      <Row padding="large">
        <Sidebar
          className="project-page__sidebar-left"
          flexOrderSmall={0}
          flexOrderLarge={0}
        >
          <FadeOnScroll variant="fade-out">
            {leftShark()}
          </FadeOnScroll>
        </Sidebar>
        <Content
          className="project-page__content"
          flexOrderSmall={2}
          flexOrderLarge={1}
        >
          {children}
        </Content>
        <Sidebar
          className="project-page__sidebar-right"
          flexOrderSmall={1}
          flexOrderLarge={2}
        > 
          <FadeOnScroll variant="fade-out">
            {rightShark()}
          </FadeOnScroll>
        </Sidebar>
      </Row>
    </main>
    <Footer />
  </>
)

const LeftSidebarLayout = ({ title, hideTitle, children }) => (
  <>
    <Header />
    <main role="main" className="site-main-content">
      <Row padding="large">
        <Sidebar>
          {!hideTitle && (
            <FadeOnScroll variant="fade-out">
              <Text
                type={textTypes.HEADER_1}
                style={{ textAlign: 'right' }}
              >
                {title.toLowerCase()}
              </Text>
            </FadeOnScroll>
          )}
        </Sidebar>
        <Content>
          {children}
        </Content>
      </Row>
    </main>
    <Footer />
  </>
);

// Switch between different layout variants
const LayoutSwitch = ({ variant, ...props }) => {
  let layout;

  switch (variant) {
    case 'holy-grail': 
      layout = <HolyGrailLayout {...props} />;
      break;
    case 'no-title': 
      layout = <LeftSidebarLayout hideTitle {...props} />;
      break;
    default: 
      layout = <LeftSidebarLayout {...props} />;
      break;
  }

  return (
    <div className="site-container">
      {layout}
    </div>
  );
}

// Render the proper layout
const Layout = (props) => (
  <Metadata>
    <Head 
      title={props.title}
      description={props.description}
      location={props.location}
    />
    <LayoutSwitch {...props} />
  </Metadata>
);

export default Layout;
