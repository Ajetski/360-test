self.addEventListener('install', function(event) {
    event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim()); // Become available to all pages
});

addEventListener('message', (event) => {
    if(event.data && event.data.code) {
        let response;
        let error;
        try {
            response = JSON.stringify(eval(event.data.code));
        }
        catch(err) {
            response = "An error occurred in your code...";
            error = err;
        }
        event.source.postMessage({
            response,
            error
        });
    }
  });

