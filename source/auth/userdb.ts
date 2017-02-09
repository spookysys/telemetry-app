
var users = {};

export function serializeUser(user, done) {
	var id = user['id'];
	console.log("Serializing user ", id, ":", user);
	users[id] = user;
	done(null, id);
};

export function deserializeUser(id, done) {
	var user = users[String(id)];
	console.log("Deserializing user ", id, ":", user);
	if (user && String(user['id']) == String(id)) done(null, user);
	else done(new Error("Failed to deserialize user id " + id), null);
};

