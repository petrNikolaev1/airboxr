import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.sourcesPage || initialState;

export const selectSourcesPage = createSelector(
  [selectDomain],
  sourcesPageState => sourcesPageState,
);
