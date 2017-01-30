import * as express from 'express';
import * as session from 'express-session';
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser')
import request = require('request');
import passport = require('passport');
import { Strategy as FacebookStrategy } from 'passport-facebook';
import secrets = require('./secrets');
import facebook = require('./facebook');
import userdb = require('./userdb');

var app = express();
app.use(express.static('public'));
app.use(session({
	secret: secrets.expressSessionSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(userdb.serializeUser);

passport.deserializeUser(userdb.deserializeUser);

passport.use(new FacebookStrategy(
	{
		clientID: secrets.facebookAppID,
		clientSecret: secrets.facebookAppSecret,
		callbackURL: "http://localhost:8080/auth/facebook_callback"
	},
	function (accessToken, refreshToken, profile, done) {
		return done(null, { 'id': profile['id'], 'accessToken': accessToken, 'refreshToken': refreshToken });
	}
));

app.get('/auth/facebook',
	passport.authenticate('facebook', { scope: ['manage_pages', 'publish_pages'] })
);

app.get('/auth/facebook_callback',
	passport.authenticate('facebook', {
		successRedirect: '/auth/success',
		failureRedirect: '/auth/facebook',
		failureFlash: 'Authentication failed'
	})
);


app.get('/auth/success', function (req, res) {
	res.send('Authentication Success');
	console.log("Session: ", req.session);
	console.log("User: ", req.user);
	main(req.session, req.user);
});




app.get('/', function (req, res) {
	res.send('<a href="/auth/facebook">Login</a>');
});

app.set('port', 8080);
app.listen(app.get('port'), () => {
	console.log(`App listening on ${app.get('port')}`);
})




async function main(session, user) {
	//fb.setAccessToken();
}
