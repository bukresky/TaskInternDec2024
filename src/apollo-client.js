
import pkg from '@apollo/client';  
const { ApolloClient, InMemoryCache } = pkg;

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache(),
});

export default client;  
