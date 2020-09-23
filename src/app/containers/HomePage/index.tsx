/**
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey } from './slice';
import { selectHomePage } from './selectors';
import { homePageSaga } from './saga';
import { HomePageContainer } from './components';
import { Layout } from 'app/components/Layout';

interface Props {}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const homePage = useSelector(selectHomePage);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();

  return (
    <>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      <Layout
        headerConfig={{
          title: t('home page title'),
        }}
      >
        <HomePageContainer />
      </Layout>
    </>
  );
});
