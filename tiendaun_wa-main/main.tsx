import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import {ApolloProvider} from '@apollo/react-hooks';


const apiUri = process.env.API_GATEWAY_GRAPHQL;
console.log(apiUri);
const client = new ApolloClient({
  link: new HttpLink({uri: 'https://tiendaun-ag-7gru2wm3bq-uc.a.run.app/graphql',}),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
)
