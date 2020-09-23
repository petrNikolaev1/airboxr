import { PayloadAction } from '@reduxjs/toolkit';
import { keyBy, xor } from 'lodash';

import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { DataStoreDto } from 'types';

// The initial state of the SourcesProvider container
export const initialState: ContainerState = {
  sources: {
    loading: false,
    data: null,
    error: null,
  },
  favouriteSources: [],
};

const sourcesProviderSlice = createSlice({
  name: 'sourcesProvider',
  initialState,
  reducers: {
    sources(state) {
      state.sources.loading = true;
      state.sources.error = null;
      state.sources.data = null;
    },
    sourcesLoaded(state, action: PayloadAction<DataStoreDto[]>) {
      state.sources.loading = false;
      state.sources.data = keyBy(action.payload, 'id');
    },
    sourcesError(state, action: PayloadAction<RequestError>) {
      state.sources.loading = false;
      state.sources.error = action.payload;
    },
    toggleFavouriteSource(state, action: PayloadAction<number>) {
      state.favouriteSources = xor(state.favouriteSources, [action.payload]);
    },
  },
});

export const { actions, reducer, name: sliceKey } = sourcesProviderSlice;
