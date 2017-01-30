import * as Express from 'express';
import * as ExpressSession from 'express-session';
import request = require('request');
import passport = require('passport');
import bodyParser = require('body-parser')
import { Strategy as FacebookStrategy } from 'passport-facebook';
import Secrets from './Secrets';

var app = Express();

app.use(Express.static('public'));
app.use(ExpressSession({
	secret: Secrets.ExpressSessionSecret,
	resave: false,
	saveUninitialized: true
}));
app.use(bodyParser.json())
//app.use(bodyParser.json({ type: 'application/*+json' }))
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function (user, done) {
	done(null, user['id']);
});

passport.deserializeUser(function (id, done) {
	done(null, { 'id': id });
});

passport.use(new FacebookStrategy({
	clientID: Secrets.FacebookID,
	clientSecret: Secrets.FacebookSecret,
	callbackURL: "http://localhost:8080/auth/facebook_callback"
},
	function (accessToken, refreshToken, profile, done) {
		//if (systemError) return done(systemError, { message: 'Database is offline' });
		//if (userError) return done(null, false, { message: 'Incorrect password' });
		return done(null, profile);
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

async function getPageAccessToken() {

}

app.get('/auth/success', function (req, res) {
	res.send('Authentication Success');
	console.log("Session: ", req.session);
	console.log("User: ", req.user);

	request({
		url: `localhost:4444/config`,
		proxy: 'http://localhost:4444',
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	}, function (err, res, body) {
		this.config = JSON.parse(body);
		console.log("response => " + this.config);
	});
});




app.get('/', function (req, res) {
	res.send('<a href="/auth/facebook">Login</a>');
});

app.set('port', 8080);
app.listen(app.get('port'), () => {
	console.log(`App listening on ${app.get('port')}`);
})

