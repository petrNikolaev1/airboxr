/**
 *
 * SourcesPage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { sourcesPageSaga } from './saga';
import { Layout } from 'app/components/Layout';
import { SourcesPageContainer } from './components';
import { actions } from 'app/containers/SourcesProvider/slice';
import { selectSources } from 'app/containers/SourcesProvider/selectors';

interface Props {}

export const SourcesPage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sourcesPageSaga });

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const { sources, error } = useSelector(selectSources);

  useEffect(() => {
    if (!sources && !error) {
      dispatch(actions.sources());
    }
  }, [dispatch, sources, error]);

  return (
    <>
      <Helmet>
        <title>SourcesPage</title>
        <meta name="description" content="Description of SourcesPage" />
      </Helmet>
      <Layout
        headerConfig={{
          title: t('sources page title'),
          withBackNavigation: true,
          withNavigation: true,
        }}
      >
        <SourcesPageContainer />
      </Layout>
    </>
  );
});
