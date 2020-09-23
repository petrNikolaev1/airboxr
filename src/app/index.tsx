/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './containers/HomePage/Loadable';
import { SourcesPage } from './containers/SourcesPage/Loadable';
import { SourcePage } from './containers/SourcePage/Loadable';
import { SourcesProvider } from './containers/SourcesProvider';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - Airboxr" defaultTitle="Airboxr">
        <meta name="description" content="Airboxr application" />
      </Helmet>
      <SourcesProvider>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sources" component={SourcesPage} />
          <Route
            exact
            path="/sources/:sourceId/:intendedTable?"
            component={SourcePage}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </SourcesProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
