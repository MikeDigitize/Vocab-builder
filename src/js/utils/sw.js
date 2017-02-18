if ('serviceWorker' in window.navigator) {
	window.navigator.serviceWorker
		.register('/service-worker.js')
		.then(function(serviceWorkerRegistration) {
	    console.log(`Registration succeeded. Scope is ${serviceWorkerRegistration.scope}`);
	  })
	  .catch(function(error) {
	    console.log(`Registration failed with ${error}`);
	  });
}