import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.sourcePage || initialState;

export const selectSourcePage = createSelector(
  [selectDomain],
  sourcePageState => sourcePageState,
);
