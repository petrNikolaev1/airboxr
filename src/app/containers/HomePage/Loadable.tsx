/**
 *
 * Asynchronously loads the component for HomePage
 *
 */

import { lazyLoad } from 'utils/loadable';
import { CircularProgress } from '@material-ui/core';
import React from 'react';

import { LoadingWrapper } from 'app/components/UI';

export const HomePage = lazyLoad(
  () => import('./index'),
  module => module.HomePage,
  {
    fallback: (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    ),
  },
);
