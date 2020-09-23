/**
 *
 * SourcesProvider
 *
 */

import { memo, ReactElement } from 'react';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { sourcesProviderSaga } from './saga';

interface Props {
  children: ReactElement;
}

export const SourcesProvider = memo(({ children }: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sourcesProviderSaga });

  return children;
});
