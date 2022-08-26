import 'tailwindcss/tailwind.css'
import '../styles/global.css'
import { ApolloProvider, useQuery } from "@apollo/client";
import client from "../apollo-client";
import { FETCH_CURRENT_USER } from '../graphql/FetchCurrentUser';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<div className='font-body'>
				<Component {...pageProps} />
			</div>
		</ApolloProvider>
	)
}

export default MyApp
