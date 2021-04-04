import React from 'react';
import { Layout } from './views/Layout';
import { FilmsContainer } from './containers/FilmsContainer';

/**
 * Here I'd have top level concerns like layout and routing...
 */
export const App: React.FC = () => (
  <Layout>
    <FilmsContainer />
  </Layout>
);
