steal( 'resources/example' )				// Loads 'resources/example.js'
	.css( 'helloworld' )			// Loads 'helloworld.css'
	.plugins(
		'steal/less',
		'steal/coffee' )					// Loads 'steal/less/less.js' and 'steal/coffee/coffee.js'
	.then(function(){						// Adds a function to be called back once all prior files have been loaded and run 
		steal.coffee('resources/example')	// Loads 'resources/example.coffee'
			.less('resources/example');		// Loads 'resources/example.less'
	});
	 