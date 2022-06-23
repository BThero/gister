const http = require('http');
const port = 3000;

const delay = (ms) => {
	return new Promise((resolve) => {
		const timer = setTimeout(() => {
			clearTimeout(timer);
			resolve(true);
		}, ms);
	});
};

const server = http.createServer(async (request, response) => {
	await delay(100);
	let body = [];

	request
		.on('data', (chunk) => {
			body.push(chunk);
		})
		.on('end', () => {
			if (body.length === 0) {
				body = 'Empty request body\n';
			} else {
				body = Buffer.concat(body).toString();
				console.log(body);
			}

			response.setHeader('Content-Type', 'text/plain');
			response.end(body);
		});
});

server.listen(port, () => {
	console.log(`server listening at port ${port}`);
});
