import { values } from 'lodash';
import { createSelector } from '@reduxjs/toolkit';

import { DataStoreDto, RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) =>
  state.sourcesProvider || initialState;

export const selectSourcesProvider = createSelector(
  [selectDomain],
  sourcesProviderState => sourcesProviderState,
);

export const selectSources = createSelector(
  [selectDomain],
  sourcesProviderState => ({
    loading: sourcesProviderState.sources.loading,
    error: sourcesProviderState.sources.error,
    sourcesList: values(sourcesProviderState.sources.data) as DataStoreDto[],
    sources: sourcesProviderState.sources.data,
  }),
);

export const selectFavouriteSources = createSelector(
  [selectDomain],
  sourcesProviderState => ({
    favouriteSources: sourcesProviderState.favouriteSources,
  }),
);
