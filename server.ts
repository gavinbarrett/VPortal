const fs = require('fs');
const bcrypt = require('bcrypt');
const express = require('express');
const socket = require('socket.io');
const https = require('https');
const app = express();
const port = 5555;
require('dotenv').config();
const id = process.env.TWILIO_ID;
const token = process.env.TWILIO_TOKEN;
const twilio = require('twilio')(id, token);
const { Client, Pool } = require('pg');

const ssl_options = {
  key: fs.readFileSync("/var/www/vportal/ssl/private/privkey.pem"),
  cert: fs.readFileSync("/var/www/vportal/ssl/fullchain.pem"),  
};

const client = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PW,
  port: process.env.PG_P,
});

// connect to database
client.connect();

const twilioToken = () => {
	return twilio.tokens.create();
}

// enable json parsing
app.use(express.json());
// serve files from ./dist
app.use(express.static('./dist'));

const server = https.createServer(ssl_options, app);

const computeHashedPass = async (pass) => {
	// bcrypt the user's password
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(10, (err, salt) => {
			if (err) reject(err);
			bcrypt.hash(pass, salt, (err, hash) => {
				if (err) reject(err);
				resolve(hash);
			});
		});
	});
}

const getHashedPass = async (user) => {
	// extract the user's hashed password from the database
	const CMD = `SELECT * FROM users WHERE username=$1`;
	const values = [user];
	return new Promise((resolve, reject) => {
		client.query(CMD, values, (err, res) => {
			if (err) reject(err);
			resolve(res);
		});
	});
}

const compareHashes = async (pass, hashword) => {
	console.log(`pass: ${pass}\nhashword: ${hashword}`);
	// compare the hashed password with the hash extracted from the database
	return new Promise((resolve, reject) => {
		bcrypt.compare(pass, hashword, (err, hash) => {
			if (err) reject(err);
			resolve(hash);
		});
	});
}

app.get('/gettoken', async (req, res) => {
	const tToken = await twilioToken();
	res.send(tToken);
});

app.post('/signin', async (req, res) => {
	const { user, pass } = req.body;
	// bcrypt pass and check db for user
	const hashed = await computeHashedPass(pass);
	const expected = await getHashedPass(user);
	if (expected) {
		const authed = await compareHashes(pass, expected["rows"][0]["password"]);
		res.send(JSON.stringify({"status":"success"}));
	} else 
		res.send(JSON.stringify({"status":"failed"}));
});

server.listen(port, () => {
	console.log(`Listening on port ${port}`);	
});

// create socket interface
const io = socket(server);

// set up all socket connections
io.on('connection', socket => {
	socket.on('join room', (roomId, userId) => {
		console.log(`User ${userId} in Room: ${roomId}`);
	});
	// emit successful connection message to the clients
	console.log('User connected.');
	socket.on('disconnect', () => {
		console.log('User disconnected.');
	});

	socket.on('test phrase', testVect => {
		console.log(testVect);
	});
	socket.on('offer', offer => {
		console.log(offer);
		socket.emit('answer', "offer received");
	});
});
