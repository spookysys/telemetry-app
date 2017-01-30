import * as Express from 'express';
import * as ExpressSession from 'express-session';
import passport = require('passport');
import { Strategy as FacebookStrategy } from 'passport-facebook';
import Secrets from './Secrets';

var app = Express();

app.use(Express.static('public'));
//app.use(Express.cookieParser());
//app.use(Express.bodyParser());
//app.use(ExpressSession({ secret: 'dumdidum' }));
app.use(passport.initialize());
//app.use(passport.session());
//app.use(app.router);


passport.serializeUser(function (user, done) {
	console.log('Serializing', user);
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	console.log('Deserializing', user);
	done(null, user);
});

passport.use(new FacebookStrategy({
	clientID: Secrets.FacebookID,
	clientSecret: Secrets.FacebookSecret,
	callbackURL: "http://localhost:8080/auth/facebook/callback"
},
	function (accessToken, refreshToken, profile, done) {
		var systemError = false;
		var userError = false;
		if (systemError) return done(systemError, { message: 'Database is offline' });
		else if (userError) return done(null, false, { message: 'Incorrect password' });
		else return done(null, { 'profile:': profile, 'yo': 'nigga' });
	}
));




app.get('/auth/facebook',
	passport.authenticate('facebook', { scope: ['manage_pages', 'publish_pages'] })
);

app.get('/auth/facebook/callback',
	passport.authenticate('facebook', {
		//successRedirect: '/success',
		failureRedirect: '/login',
		failureFlash: 'UUUuuhh'
	}),
	function (req, res) {
		res.redirect('/success');
	}
);




// Try jade bodyparser
app.get('/', function (req, res) {
	res.send('<a href="/auth/facebook">Login with Facebook</a>');
});

app.get('/success', function (req, res) {
	res.send('Success yo');
});

app.get('/login', function (req, res) {
	res.send('Login yo');
});


var port = 8080;
app.listen(8080, () => {
	console.log(`App listening on ${port}`);
})

