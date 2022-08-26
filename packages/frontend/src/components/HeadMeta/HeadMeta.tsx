import Head from 'next/head'

// Meta to add open graph tags etc (in future)
const HeadMeta = ({ title }) => {
	return (
		<Head >
			<title>{title}</title>
			<meta charSet="UTF-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
		</Head>
	)
}

export default HeadMeta;
