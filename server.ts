const express = require('express');
const app = express();
const port = 5555;

app.use(express.static('./dist'));

app.get('/', (req, res) => {
	res.send('index');
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
