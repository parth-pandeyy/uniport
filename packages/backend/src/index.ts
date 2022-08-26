import Express from 'express';
import { BACKEND_SERVER_PORT, CASSANDRA_KEYSPACE, SESSION_SECRET_KEY } from './config/constants';
import { ApolloServer } from 'apollo-server-express';
import session from 'express-session';
import CassandraStore from 'cassandra-store';
import passport from 'passport';
import { dbClient } from './db';
import { UserModelType } from './models/User';
import { localStrategyConfig } from './config/auth/localStrategyConfig';
import { mergedResolvers } from './resolvers';
import http from 'http';
import { UserSchema } from './schema/User';
import cookie_parser from 'cookie-parser';
import cors from 'cors';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core/dist/plugin/landingPage/graphqlPlayground';
import { navMenuSchema } from './schema/NavMenu';
import { studentProfileDefinitionSchema } from './schema/StudentProfileDefinition';
import { campaignSchema } from './schema/Campaign';
import studentProfileRoutes from './routes/StudentProfile';


const app = Express();
declare global {
	namespace Express {
		interface User extends UserModelType {

		}
	}
}

// express session
app.set('trust proxy', 1) // trust first proxy

app.use(cors({
	origin: 'http://localhost:3000',
	credentials: true,
}))


app.use(session({
	secret: SESSION_SECRET_KEY,
	name: 'uni_id',
	saveUninitialized: false,
	resave: true,
	cookie: {
		// secure: true,
		httpOnly: true,
		maxAge: 365 * 24 * 60 * 60 * 1000,
	},
	store: new CassandraStore({
		"table": "sessions",
		"client": dbClient,
		"clientOptions": {
			"contactPoints": ["localhost"],
			"keyspace": CASSANDRA_KEYSPACE,
			"queryOptions": {
				"prepare": true
			}
		}
	})
}))
// TODO:

app.use(cookie_parser())
app.use(Express.json())



// Passport config
passport.use(localStrategyConfig);


passport.serializeUser<UserModelType, any>((user: UserModelType, done: any) => {
	console.log("Serialize user?");
	done(null, user.email_address);
})

passport.deserializeUser(async (email, done) => {
	try {
		console.log("New deserial?", email);
		const instance = await dbClient.execute('SELECT * FROM user WHERE email_address=?', [email]);
		if (instance.rowLength !== 1) {
			throw Error("Passport: Invalid email");
		}
		let user = instance.rows[0] as unknown as UserModelType;
		done(null, user);

	} catch (err) {
		done(err, false);
	}
});

app.use(passport.initialize());
app.use(passport.session());


app.get('/', async (req, res) => {
	res.send({
		error: false,
		status: "GREAT"
	})
});

app.use('/s/', studentProfileRoutes);


(async () => {
	const server = new ApolloServer({
		typeDefs: [UserSchema, navMenuSchema, studentProfileDefinitionSchema, campaignSchema],
		resolvers: mergedResolvers,
		context: ({ req, res }) => ({ req, res }),
		plugins: [
			ApolloServerPluginLandingPageGraphQLPlayground
		]
	});
	const httpServer = http.createServer(app);
	await server.start();
	server.applyMiddleware({ app, cors: false });


	await new Promise(resolve => httpServer.listen({ port: BACKEND_SERVER_PORT }, resolve as any));
	console.log(`🚀 Server ready at http://localhost:${BACKEND_SERVER_PORT}${server.graphqlPath}`);
})();

