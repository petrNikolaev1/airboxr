/* --- STATE --- */

import { DataStoreDto } from 'types';

export interface SourcesProviderState {
  sources: {
    loading: boolean;
    data: Dictionary<DataStoreDto> | null;
    error: RequestError | null;
  };
  favouriteSources: number[];
}

export type ContainerState = SourcesProviderState;
