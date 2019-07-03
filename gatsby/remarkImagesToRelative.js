const path = require('path');
const deepMap = require('deep-map');

// Convert paths in frontmatter to relative
const makeRelative = function makeRelative(value) {
  let newValue = value;

  if (typeof value === 'string' && path.isAbsolute(value)) {
    newValue = path.join('../../assets/', value);
  }

  return newValue;
};

module.exports = function remarkImagesToRelative(node) {
  if (node.internal.type === 'MarkdownRemark') {
    deepMap(node.frontmatter, makeRelative, {
      inPlace: true,
    });
  }
};
