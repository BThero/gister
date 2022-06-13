/* Usage: node dirtree [dist] [-d/--depth?: number] */

const args = process.argv.slice(2);

if (args.length === 0) {
	throw new Error('Please pass a file/directory as an argument');
}

let maxDepth = Infinity;
let dist = undefined;

for (let i = 0; i < args.length; ) {
	if (args[i] === '-d' || args[i] === '--depth') {
		if (i + 1 < args.length) {
			maxDepth = args[i + 1];
		} else {
			throw new Error('-d or --depth specified incorrectly');
		}

		i += 2;
	} else {
		if (dist === undefined) {
			dist = args[i];
		} else {
			throw new Error('directory/file given more than once');
		}

		i += 1;
	}
}

if (dist === undefined) {
	throw new Error('directory/file not found');
}

const fs = require('fs');
const path = require('path');

let dirs = 0;
let files = 0;

function recurse(dist, depth = 0, unclosed = []) {
	if (typeof dist !== 'string') {
		throw new Error(`Error: expected "string" type, received ${typeof dist}`);
	}

	if (!fs.existsSync(dist)) {
		throw new Error('Error: file/directory not found');
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

	if (depth !== 0) {
		str += ' ';
	}

	str += path.parse(dist).name;

	if (!fs.statSync(dist).isDirectory()) {
		console.log(str);
		files += 1;
		return;
	}

	dirs += 1;

	if (depth < maxDepth) {
		console.log(str);

		const folder = fs.opendirSync(dist);
		let current = folder.readSync();

		if (current) {
			unclosed.push(depth);

			while (current) {
				const next = folder.readSync();

				if (!next) {
					unclosed.pop();
				}

				recurse(dist + '/' + current.name, depth + 1, unclosed);
				current = next;
			}
		}
	} else {
		let count = fs.readdirSync(dist).length;
		console.log(str + ` (${count} more)`);
	}
}

recurse(dist);
console.log(`${dirs} directories, ${files} files`);
