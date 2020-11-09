const bcrypt = require('bcrypt');
const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');
const app = express();
app.use(cors());
const server = http.Server(app);
const io = socket(server);
const { Client, Pool } = require('pg');
const port = 5555;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'portalusers',
  password: '',
  port: 5432,
})

client.connect();

// enable json parsing
app.use(express.json());
// serve files from ./dist
app.use(express.static('./dist'));

io.on('connection', (socket) => {
	socket.emit('greeting', "Welcome to the network.");
	console.log('User connected.');
});

const computeHashedPass = async (pass) => {
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
	return new Promise((resolve, reject) => {
		bcrypt.compare(pass, hashword, (err, hash) => {
			if (err) reject(err);
			resolve(hash);
		});
	});
}

app.post('/signin', async (req, res) => {
	const { user, pass } = req.body;
	// bcrypt pass and check db for user
	const hashed = await computeHashedPass(pass);
	const expected = await getHashedPass(user);
	if (expected) {
		const authed = await compareHashes(pass, expected["rows"][0]["hashpass"]);
		res.send(JSON.stringify({"status":"success"}));
	} else 
		res.send(JSON.stringify({"status":"failed"}));
});

app.get('/', (req, res) => {
	res.send('index');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});

server.listen(3000, () => {
	console.log(`Socket interface on port 3000`);
});
