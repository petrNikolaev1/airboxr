/**
 *
 * Asynchronously loads the component for SourcePage
 *
 */

import { lazyLoad } from 'utils/loadable';
import { CircularProgress } from '@material-ui/core';
import React from 'react';

import { LoadingWrapper } from 'app/components/UI';

export const SourcePage = lazyLoad(
  () => import('./index'),
  module => module.SourcePage,
  {
    fallback: (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    ),
  },
);
