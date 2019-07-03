import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Row from '../components/Row';
import Column from '../components/Column';
import Text, { types as textTypes } from '../components/Text';
import '../styles/pages/project.css';

/*
 * Function: SidebarDetail
 * Description: Renders a detail for the project template sidebar
 */
function SidebarDetail({ label, data, formatData }) {
  if (data) {
    const renderData = v =>
      (Array.isArray(v) ? Array.from(v).map(i => <Fragment>{i}<br /></Fragment>) : v);

    return (
      <Column largeSize={12} smallSize={6}>
        <Text type={textTypes.SMALL}>
          {label}
        </Text>
        <Text>
          {renderData(formatData ? formatData(data) : data)}
        </Text>
      </Column>
    );
  }

  return null;
}

SidebarDetail.defaultProps = {
  formatData: data => data,
};

SidebarDetail.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  formatData: PropTypes.func,
};

SidebarDetail.defaultProps = {
  data: null,
};

/*
 * Function: ProjectExternalLink
 * Description: Renders the external link for a project if it exists
 */
const ProjectExternalLink = ({ linkTo, description }) => linkTo && (
  <a
    className="anchor-arrow-upright column-hide-on-small"
    target="_blank"
    rel="noopener noreferrer"
    href={linkTo}
  >
    {description}
  </a>
);

ProjectExternalLink.propTypes = {
  linkTo: PropTypes.string,
  description: PropTypes.string,
};

/*
 * Function: ProjectDetails
 * Description: Renders the summary of the project for the left sidebar
 */
export const ProjectSummary = ({title}) => {
  return (
    <div style={{ textAlign: 'right' }}>
      <Text type={textTypes.HEADER_1} className="project-page__title">
        {title}
      </Text>
    </div>
  );
};

ProjectSummary.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  externalLink: PropTypes.string,
  externalLinkDescription: PropTypes.string,
};

ProjectSummary.defaultProps = {
  externalLink: null,
  externalLinkDescription: null,
};

/*
 * Function: ProjectDetails
 * Description: Renders the details of the project for the right sidebar
 */
export const ProjectDetails = (props) => {
  const {
    client,
    collaborators,
    date,
    category,
    githubStargazers,
    githubOpenIssues,
  } = props;

  return (
    <Row padding="none">
      <SidebarDetail
        label="Made For"
        data={client}
      />
      <SidebarDetail
        label="Collaborated With"
        data={collaborators}
      />
      <SidebarDetail
        label="Shipped In"
        data={date}
      />
      <SidebarDetail
        label="Type of Work"
        data={category}
      />
      <SidebarDetail
        label="Stars on Github"
        data={githubStargazers}
        formatData={(data) => {
          let hundredth;
          const thousandth = Math.round((data / 1000), 1);

          if (thousandth) {
            hundredth = Math.round(((data % 1000) / 100), 1);

            return `${thousandth}.${hundredth}k`;
          }
          hundredth = Math.round((data / 100), 1);

          return hundredth;
        }}
      />
      <SidebarDetail
        label="Open Issues on Github"
        data={githubOpenIssues}
      />
    </Row>
  );
};

ProjectDetails.propTypes = {
  client: PropTypes.string,
  collaborators: PropTypes.string,
  date: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  githubStargazers: PropTypes.number,
  githubOpenIssues: PropTypes.number,
};

ProjectDetails.defaultProps = {
  client: null,
  collaborators: null,
  githubStargazers: null,
  githubOpenIssues: null,
};

/*
 * Function: ProjectTemplate
 * Description: Renders the template for a project
 */
const ProjectTemplate = ({ data: { page } }) => (
  <Layout
    title={page.frontmatter.title}
    url={page.fields.slug}
    description={page.frontmatter.description}
    keywords={page.frontmatter.keywords}
    image={page.frontmatter.featuredImageCropped ? page.frontmatter.featuredImageCropped.childImageSharp.resolutions.src : null}
    variant="holy-grail"
    leftShark={() => (
      <ProjectSummary
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        externalLink={page.frontmatter.externalLink}
        externalLinkDescription={page.frontmatter.externalLinkDescription}
      />
    )}
    rightShark={() => (
      <ProjectDetails
        client={page.frontmatter.client}
        collaborators={page.frontmatter.collaborators}
        date={page.frontmatter.date}
        category={page.frontmatter.category}
        githubStargazers={page.frontmatter.githubStargazers}
        githubOpenIssues={page.frontmatter.githubOpenIssues}
      />
    )}
  >
    {page.html}
  </Layout>
);

export default ProjectTemplate;

export const query = graphql`
  query ProjectTemplate($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        githubStargazers
        githubOpenIssues
      }
      frontmatter {
        title
        description
        category
        keywords
        client
        externalLink
        externalLinkDescription
        date(formatString: "YYYY")
        featuredImageCropped: featuredImage {
          childImageSharp {
            resolutions(height: 1200, width: 1200) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
        featuredImage {
          childImageSharp {
            sizes(maxHeight: 400) {
              ...GatsbyImageSharpSizes
            }
          }
        }
      }
    }
  }
`;
