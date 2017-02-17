if ('serviceWorker' in window.navigator) {
	window.navigator.serviceWorker
		.register('/service-worker.js')
		.then(function(reg) {
	    console.log(`Registration succeeded. Scope is ${reg.scope}`);
	  }).catch(function(error) {
	    console.log(`Registration failed with ${error}`);
	  });
}