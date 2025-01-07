import { cache } from '@/lib/apollo/cache';
import { ApolloClient, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { SHOPIFY_GRAPHQL_API_ENDPOINT } from '../constant';
import { getDomain } from '../utils';

const domain = getDomain();

const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;

// HTTP Link with Auth
const httpLink = new HttpLink({
  uri: endpoint,
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
  },
  credentials: 'same-origin'
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(`
        [GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}
      `);
    })
  }

  if (networkError) {
    console.error(`[GraphQL Network error]: ${networkError}`)
  }
});

export const getApolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache,
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});