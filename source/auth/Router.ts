import { facebookAppID, facebookAppSecret } from '../config/secret';
import * as express from 'express';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';
import { Strategy } from 'passport-facebook';
import * as userdb from './userdb';

export function Router(myUrl: string, successRoute: string) {
	var router = express.Router();

	passport.serializeUser(userdb.serializeUser);
	passport.deserializeUser(userdb.deserializeUser);

	passport.use(new Strategy(
		{
			clientID: facebookAppID,
			clientSecret: facebookAppSecret,
			callbackURL: myUrl + "/callback"
		},
		function (accessToken, refreshToken, profile, done) {
			return done(null, {
				'id': profile['id'],
				'accessToken': accessToken,
				'refreshToken': refreshToken
			});
		}
	));


	router.get('/start',
		passport.authenticate('facebook', {
			scope: ['manage_pages', 'publish_pages']
		})
	);

	router.get('/callback',
		passport.authenticate('facebook', {
			successRedirect: successRoute,
			failureRedirect: './failure',
			failureFlash: 'Authentication failed'
		})
	);

	router.get('/failure', function (req, res) {
		res.status(500).send('Authentication failure');
	});

	return router;
}
