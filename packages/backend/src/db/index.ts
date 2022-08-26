import { CASSANDRA_KEYSPACE, CASSANDRA_PASSWORD, CASSANDRA_USERNAME, SESSION_SECRET_KEY } from '../config/constants';
import path from 'path';
import { Client } from 'cassandra-driver';


export const dbClient = new Client({
	cloud: {
		secureConnectBundle: path.join(__dirname, "..", '..', "secure-connect-creds.zip"),
	},
	credentials: {
		username: CASSANDRA_USERNAME,
		password: CASSANDRA_PASSWORD,
	},
	keyspace: CASSANDRA_KEYSPACE,
	encoding: {
		useUndefinedAsUnset: false,
	}
})
