import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { StartPage } from './src/StartPage';

const client = new ApolloClient({
  uri: 'http://localhost:7007/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ErrorBoundary fallbackRender={({ error }) => <>Error!!! Alarm: {error.message}</>}>
    <ApolloProvider client={client}>
      <StartPage />
    </ApolloProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
