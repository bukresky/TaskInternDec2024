This application serves as a simple and effective tool for exploring Rick and Morty characters. 
It offers features such as filtering. 
Key technologies used to create this application:

Graphql - query language used to interact with the Rick and Morty API, 
Apollo client - for managing data fetching and state management related to GraphQL,
React - for user interface

In the Apollo-client.js I import apollo/client package as pkg(this package contains all the necessary functionalities to set up Apollo client), ApolloClient is later used to create an instance for connecting with Graphql server and InMemoryCache is used for caching the query results in memory to optimize performance. Later we create a new variable - client and the uri property specifies the endpoint of the Graphql(which is a public API), the cache property means the client will cache the results of queries in memory for efficient data retrieval. Later, I export the client instance as the default export of the module. 

