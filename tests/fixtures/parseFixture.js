var fs = require( "fs" );

module.exports = function( name ) {
	var fixtures = {};
	fs.readFileSync( __dirname + "/" + name + ".txt", "utf8" )
		.trim()
		.split( "\n=====\n")
		.forEach(function( raw ) {
			var parts = raw.split( "\n*****\n" );
			fixtures[ parts[ 0 ] ] = {
				input: parts[ 1 ],
				output: parts[ 2 ]
			};
		});
	return fixtures;
};