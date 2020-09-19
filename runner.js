// allow tabs
var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

function runCodeLocal(input) {
    navigator.serviceWorker.controller.postMessage({
        code: '(function() { ' + input + ' }())'
    });
}

function runCodeRemote(input) {
    fetch('http://127.0.0.1:3000', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        body: JSON.stringify({
            code: input
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        res.text().then(text => {
            console.log("server's response: ", JSON.parse(text));
            document.getElementById('output').innerText = "Server Response: " + JSON.parse(text).response;
        })
    }).catch(err => {
        console.log("server's error: ", err);
    });
}

navigator.serviceWorker.addEventListener('message', event => {
    if(event.data.error) {
        console.log("worker error: ", event.data);
    }
    else{
        console.log("worker's repsonse: ", event.data);
    }
    document.getElementById('output').innerText = "Local Response: " + JSON.parse(event.data.response).response;
  });

navigator.serviceWorker.register("/worker.js")
    .then(function (registration) {
        console.log("ServiceWorker registration successful with scope: ", registration.scope, registration);
        if(!navigator.serviceWorker.controller){
            location.reload();
        }
    })
    .catch(function (error) {
        console.error("Service Worker Error", error);
    });




