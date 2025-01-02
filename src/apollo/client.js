import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SHOPIFY_ENDPOINT, SHOPIFY_ACCESS_TOKEN } from '@env';

const client = new ApolloClient({
  uri: SHOPIFY_ENDPOINT,
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_ACCESS_TOKEN,
  },
  cache: new InMemoryCache(),
});

export default client;
