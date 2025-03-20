import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import client from '../lib/apolloClients';
import { LanguageProvider } from '../context/LanguageContext';
import '../src/i18n';


function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ApolloProvider>
  );
}

export default MyApp;