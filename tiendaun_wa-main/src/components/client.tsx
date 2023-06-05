import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const apiURL = process.env.API_GATEWAY_GRAPHQL;

export const client = new ApolloClient({
  link: new HttpLink({uri: apiURL,}),
  cache: new InMemoryCache(),
});