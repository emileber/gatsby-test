import React from 'react';
import kebabCase from 'lodash/kebabCase';
import Link from '@/components/shared/Link';

const PostTags = ({ tags }) => (
  <div className="post-tag-container">
    {tags && tags.map((tag) => (
      <Link
        key={tag}
        style={{
          textDecoration: 'none',
        }}
        to={`/tags/${kebabCase(tag)}`}
      >
        <button type="button">{tag}</button>
      </Link>
    ))}
  </div>
);

export default PostTags;
