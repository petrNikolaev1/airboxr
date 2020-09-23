/**
 *
 * Asynchronously loads the component for SourcesPage
 *
 */

import { lazyLoad } from 'utils/loadable';
import { CircularProgress } from '@material-ui/core';
import React from 'react';

import { LoadingWrapper } from 'app/components/UI';

export const SourcesPage = lazyLoad(
  () => import('./index'),
  module => module.SourcesPage,
  {
    fallback: (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    ),
  },
);
