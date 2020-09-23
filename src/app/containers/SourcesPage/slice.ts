import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the SourcesPage container
export const initialState: ContainerState = {};

const sourcesPageSlice = createSlice({
  name: 'sourcesPage',
  initialState,
  reducers: {
    someAction(state, action: PayloadAction<any>) {},
  },
});

export const { actions, reducer, name: sliceKey } = sourcesPageSlice;
