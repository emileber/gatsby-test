import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import config from '~/SiteConfig';
import Page from '@/components/layout/Page';
import TwitterFollowButton from '@/components/shared/TwitterFollowButton';
import PostTags from '@/components/PostTags/PostTags';
import SocialLinks from '@/components/SocialLinks/SocialLinks';
import SEO from '@/components/SEO/SEO';
import Footer from '@/components/layout/Footer';
// import './b16-tomorrow-dark.css';
import './post.css';

const PostTemplate = ({ data, pageContext: { slug } }) => {
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;

  if (!post.id) {
    post.id = slug;
  }

  if (!post.category_id) {
    post.category_id = config.postDefaultCategoryID;
  }

  return (
    <Page>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div>
          <h1>{post.title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
          <div className="post-meta">
            <PostTags tags={post.tags} />
            <SocialLinks postPath={slug} postNode={postNode} />
          </div>
          <TwitterFollowButton username={config.userTwitter} />
          <Footer config={config} />
        </div>
      </div>
    </Page>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
