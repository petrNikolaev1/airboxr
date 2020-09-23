/**
 *
 * SourcePage
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { sourcePageSaga } from './saga';
import { Layout } from 'app/components/Layout';
import { SourcePageContainer } from './components';
import { selectSources } from 'app/containers/SourcesProvider/selectors';
import { actions } from 'app/containers/SourcesProvider/slice';
import { StyledCircularProgress } from './components/styled';
import { Typography } from '@material-ui/core';

interface Props {}

export const SourcePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: sourcePageSaga });

  const dispatch = useDispatch();

  const { sources, error } = useSelector(selectSources);

  useEffect(() => {
    if (!sources && !error) {
      dispatch(actions.sources());
    }
  }, [dispatch, sources, error]);

  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>SourcePage</title>
        <meta name="description" content="Description of SourcePage" />
      </Helmet>
      <Layout
        headerConfig={{
          title: t('source page title'),
          withBackNavigation: true,
          withNavigation: true,
        }}
      >
        {error ? (
          <Typography>{`${t('sources error')}: ${error.message}`}</Typography>
        ) : sources ? (
          <SourcePageContainer />
        ) : (
          <StyledCircularProgress />
        )}
      </Layout>
    </>
  );
});
