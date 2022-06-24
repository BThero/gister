/* Usage: node tree [.json file] */

const args = process.argv.slice(2);

if (args.length === 0) {
	throw new Error('Please pass a .json file as an argument');
}

if (args.length > 1) {
	throw new Error(`Too many arguments: expected 1, found ${args.length}`);
}

const fs = require('fs');
const data = JSON.parse(fs.readFileSync(args[0]).toString());

let dirs = 0;
let files = 0;
const unclosed = [];

function recurse(data, depth = 0) {
	if (typeof data != 'object') {
		throw new Error(`Error: expected "object" type, received ${typeof data}`);
	}

	if (!data.name) {
		throw new Error('Error: no "name" property in the object');
	}

	let str = '';

	for (let i = 0; i < depth; i++) {
		if (i + 1 < depth) {
			if (unclosed.some((x) => x == i)) {
				str += '┃ ';
			} else {
				str += '  ';
			}
		} else {
			if (unclosed.some((x) => x == i)) {
				str += '┣━';
			} else {
				str += '┗━';
			}
		}
	}

	str += ' ' + data.name;
	console.log(str);

	if (data.items) {
		dirs += 1;

		unclosed.push(depth);

		data.items.forEach((item, idx) => {
			if (idx === data.items.length - 1) {
				unclosed.pop();
			}

			recurse(item, depth + 1);
		});
	} else {
		files += 1;
	}
}

recurse(data);
console.log(`${dirs} directories, ${files} files`);
