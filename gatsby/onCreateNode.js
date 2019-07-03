/* eslint-disable no-console */
require('dotenv').config();
const fetch = require('node-fetch');
const remarkImagesToRelative = require('./remarkImagesToRelative.js');

const TEMPLATE_KEYS = {
  PROJECT: 'project',
  PAGE: 'page',
  POST: 'post',
  NOTE: 'note',
};

/*
 * Function: getStatsForNode
 * Description: Get the stats for open source nodes
 */
const getStatsForNode = ({ frontmatter }) => {
  if (
    frontmatter.templateKey !== TEMPLATE_KEYS.PROJECT &&
    frontmatter.category !== 'Open Source'
  ) {
    return Promise.resolve({
      starGazersCount: 0,
      openIssuesCount: 0,
    });
  }

  const accessToken = process.env.GITHUB_ACCESS_TOKEN;
  const apiUrl = 'https://api.github.com/repos';
  const repoPath = `pburtchaell/${frontmatter.path}`;

  if (!accessToken) {
    return Promise.reject(new Error('Failed to fetch stats for open source projects. Github API access token is required.'));
  }

  // Fetch repo stats from GitHub API
  return fetch(`${apiUrl}/${repoPath}?access_token=${accessToken}`)
    .then(result => result.json())
    .then(({ stargazers_count: starGazersCount, open_issues_count: openIssuesCount }) => ({
      starGazersCount: starGazersCount ? starGazersCount : 0,
      openIssuesCount: openIssuesCount ? openIssuesCount : 0,
    }))
    .catch(error => console.warn(error));
};

/*
 * Function: getSlugForNode
 * Description: Construct the slug for a node
 */
const getSlugForNode = ({ frontmatter }) => {
  const year = frontmatter.date ? new Date(frontmatter.date).getFullYear() : null;

  return new Promise((resolve, reject) => {
    switch (frontmatter.templateKey) {
      case TEMPLATE_KEYS.NOTE:
        resolve(`notes/${frontmatter.category.toLowerCase()}/${frontmatter.path}`);
        break;

      case TEMPLATE_KEYS.PAGE:
        resolve(frontmatter.path);
        break;

      case TEMPLATE_KEYS.PROJECT:
        resolve(`work/${year}/${frontmatter.path}`);
        break;

      case TEMPLATE_KEYS.POST:
        resolve(`posts/${year}/${frontmatter.path}`);
        break;

      default: reject(new Error('Could not get slug for node'));
    }
  });
};

/*
 * Function: onCreateNode
 * Description: Add fields required to render pages
 */
module.exports = ({ node, actions }) => {
  const { createNodeField } = actions;

  remarkImagesToRelative(node);

  if (node.internal.type === 'MarkdownRemark') {
    // Todo: handle index pages for guides
    getSlugForNode(node)
      .then(
        (slug) => {
          createNodeField({ name: 'slug', value: slug, node });
        },
        (error) => {
          console.error(error);
        },
      );

    // Add stats for open source projects
    getStatsForNode(node).then(({ starGazersCount, openIssuesCount }) => {
      createNodeField({ name: 'githubStargazers', value: starGazersCount, node });
      createNodeField({ name: 'githubOpenIssues', value: openIssuesCount, node });
    });
  }
};
