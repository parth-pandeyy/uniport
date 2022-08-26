import dotenv from 'dotenv';

dotenv.config();

export const CASSANDRA_USERNAME = process.env.CASSANDRA_USERNAME as string;
export const CASSANDRA_PASSWORD = process.env.CASSANDRA_PASSWORD as string;
export const CASSANDRA_KEYSPACE = process.env.CASSANDRA_KEYSPACE as string;
export const SESSION_SECRET_KEY = process.env.SESSION_SECRET_KEY as string;
export const BACKEND_SERVER_PORT = process.env.BACKEND_SERVER_PORT as string;
export const PWD_HASH_ROUNDS = parseInt(process.env.PWD_HASH_ROUNDS as string);

export const STUDENT_PROFILE_BLOCK_ID_INDEX_DELIM='---'
