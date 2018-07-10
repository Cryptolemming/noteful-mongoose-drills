const printColorFormat = '\x1b[36m%s\x1b[0m';

const printBuilder = (text) => {
	console.log(printColorFormat,
				'####################################################\n' +
				text + '\n' +
				'####################################################\n');
};

module.exports = { printBuilder };
