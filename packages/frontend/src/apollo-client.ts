import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
	uri: "http://localhost:4201/graphql",
	credentials: 'include'
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link
});

export default client;
