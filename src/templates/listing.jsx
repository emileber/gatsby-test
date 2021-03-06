import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import config from '~/SiteConfig';
import Link from '@/components/shared/Link';
import Page from '@/components/layout/Page';
import PostListing from '@/components/PostListing/PostListing';
import SEO from '@/components/SEO/SEO';
import './listing.css';

const Listing = ({ data, pageContext: { currentPageNum, pageCount } }) => {
  const prevPage = currentPageNum - 1 === 1 ? '/' : `/${currentPageNum - 1}/`;
  const nextPage = `/${currentPageNum + 1}/`;
  const isFirstPage = currentPageNum === 1;
  const isLastPage = currentPageNum === pageCount;
  return (
    <Page>
      <div className="listing-container">
        <div className="posts-container">
          <Helmet title={config.siteTitle} />
          <SEO />
          <PostListing postEdges={data.allMarkdownRemark.edges} />
        </div>
        <div className="paging-container">
          {!isFirstPage && <Link to={prevPage}>Previous</Link>}
          {[...Array(pageCount)].map((_val, index) => {
            const pageNum = index + 1;
            return (
              <Link
                key={`listing-page-${pageNum}`}
                to={pageNum === 1 ? '/' : `/${pageNum}/`}
              >
                {pageNum}
              </Link>
            );
          })}
          {!isLastPage && <Link to={nextPage}>Next</Link>}
        </div>
      </div>
    </Page>
  );
};

export default Listing;

export const listingQuery = graphql`
  query ListingQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [fields___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
