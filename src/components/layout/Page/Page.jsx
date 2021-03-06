import '@/scss/main.scss';
import './Page.scss';
import React from 'react';
import Helmet from 'react-helmet';
import config from '~/SiteConfig';
import Footer from '@/components/layout/Footer';
import PageHeader from './PageHeader';

const Page = ({ children }) => (
  <div className="io-layout">
    <Helmet>
      <meta name="description" content={config.siteDescription} />
      <html lang="en" />
    </Helmet>
    <PageHeader />
    {children}
    <Footer config={config} />
  </div>
);

export default Page;
